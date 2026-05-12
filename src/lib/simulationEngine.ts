import type { SpeciesAgent, ClimateParams, SimulationStep, SimulationResult, UncertaintyBand } from './types';
import { buildInteractionCoefficients, getTrophicInteractions } from './dataPipeline';
import { generateRecommendations } from './recommendationEngine';

function getClimateTemp(climate: ClimateParams, year: number): number {
  return climate.baseTemp + climate.tempChangePerYear * year;
}

function climateSurvivalModifier(agent: SpeciesAgent, temp: number): number {
  const diff = Math.abs(temp - agent.species.climateOptimalTemp);
  const tolerance = agent.species.climateTolerance * (0.5 + 0.5 * agent.geneticFitness.climateResilience);
  if (diff <= tolerance * 0.5) return 1.0;
  if (diff >= tolerance) return 0.3;
  return 1.0 - 0.7 * ((diff - tolerance * 0.5) / (tolerance * 0.5));
}

function simulateOneRun(agents: SpeciesAgent[], climate: ClimateParams, years: number): SimulationStep[] {
  // Deep clone agents
  const state = agents.map(a => ({
    ...a,
    population: a.population,
    species: { ...a.species },
    geneticFitness: { ...a.geneticFitness },
    interactionCoefficients: { ...a.interactionCoefficients },
  }));

  const steps: SimulationStep[] = [];

  for (let y = 0; y <= years; y++) {
    const temp = getClimateTemp(climate, y);
    const pops: Record<string, number> = {};
    const extinctions: string[] = [];

    for (const agent of state) {
      pops[agent.species.name] = Math.round(agent.population);
      if (agent.population < 1) extinctions.push(agent.species.name);
    }

    // Ecosystem health: diversity + stability
    const totalPop = Object.values(pops).reduce((a, b) => a + b, 0);
    const speciesAlive = state.filter(a => a.population >= 1).length;
    const diversity = speciesAlive / state.length;
    const popBalance = totalPop > 0
      ? 1 - (Math.max(...Object.values(pops)) - Math.min(...Object.values(pops))) / (totalPop + 1)
      : 0;
    const ecosystemHealth = Math.max(0, Math.min(1, diversity * 0.6 + popBalance * 0.4));

    steps.push({ year: y, populations: { ...pops }, ecosystemHealth, temperature: temp, extinctions });

    // Update populations via Lotka-Volterra + climate + stochasticity
    for (const agent of state) {
      if (agent.population < 1) { agent.population = 0; continue; }

      const climateMod = climateSurvivalModifier(agent, temp);
      const K = agent.species.carryingCapacity;
      const r = agent.species.birthRate * agent.geneticFitness.reproductiveSuccess * climateMod
        - agent.species.deathRate * (1 - agent.geneticFitness.diseaseResistance * 0.3);

      // Interaction effects
      let interactionEffect = 0;
      for (const other of state) {
        if (other.id === agent.id || other.population < 1) continue;
        const coeff = agent.interactionCoefficients[other.species.name] || 0;
        interactionEffect += coeff * other.population;
      }

      // Logistic growth with interactions
      const logisticTerm = 1 - agent.population / K;
      const growthRate = r * logisticTerm + interactionEffect;

      // Stochastic noise (environmental)
      const noise = 1 + (Math.random() - 0.5) * 0.15;

      // Extreme events
      const extremeEvent = Math.random() < (climate.extremeEventFrequency / 100)
        ? 0.85 : 1.0;

      const newPop = agent.population * (1 + growthRate) * noise * extremeEvent;
      agent.population = Math.max(0, Math.min(K * 1.5, newPop));

      // Allee effect (small populations struggle)
      if (agent.population < 20 && agent.population > 0) {
        agent.population *= 0.95;
      }
    }
  }

  return steps;
}

export function runSimulation(
  agents: SpeciesAgent[],
  climate: ClimateParams,
  years: number,
  monteCarloRuns: number
): SimulationResult {
  buildInteractionCoefficients(agents);

  const allRuns: SimulationStep[][] = [];
  for (let i = 0; i < monteCarloRuns; i++) {
    allRuns.push(simulateOneRun(agents, climate, years));
  }

  // Aggregate: median run
  const medianRun = allRuns[Math.floor(allRuns.length / 2)];

  // Compute uncertainty bands
  const speciesNames = agents.map(a => a.species.name);
  const uncertaintyBands: UncertaintyBand[] = [];

  for (let y = 0; y <= years; y++) {
    for (const sp of speciesNames) {
      const values = allRuns.map(run => run[y]?.populations[sp] ?? 0).sort((a, b) => a - b);
      const n = values.length;
      uncertaintyBands.push({
        year: y,
        species: sp,
        mean: values.reduce((a, b) => a + b, 0) / n,
        lower5: values[Math.floor(n * 0.05)] ?? 0,
        upper95: values[Math.floor(n * 0.95)] ?? 0,
        lower25: values[Math.floor(n * 0.25)] ?? 0,
        upper75: values[Math.floor(n * 0.75)] ?? 0,
      });
    }
  }

  // Survival probabilities
  const survivalProbabilities: Record<string, number> = {};
  for (const sp of speciesNames) {
    const survived = allRuns.filter(run => {
      const lastStep = run[run.length - 1];
      return (lastStep?.populations[sp] ?? 0) > 10;
    }).length;
    survivalProbabilities[sp] = survived / allRuns.length;
  }

  const lastStep = medianRun[medianRun.length - 1];
  const finalPopulations = lastStep?.populations ?? {};

  // Ecosystem stability: average health over last 10 years
  const last10 = medianRun.slice(-10);
  const ecosystemStability = last10.reduce((a, s) => a + s.ecosystemHealth, 0) / last10.length;

  const trophicInteractions = getTrophicInteractions(agents);
  const recommendations = generateRecommendations(agents, survivalProbabilities, ecosystemStability, climate);

  return {
    steps: medianRun,
    finalPopulations,
    survivalProbabilities,
    ecosystemStability,
    recommendations,
    uncertaintyBands,
    trophicInteractions,
  };
}
