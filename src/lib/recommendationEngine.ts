import type { SpeciesAgent, ClimateParams, Recommendation } from './types';

export function generateRecommendations(
  agents: SpeciesAgent[],
  survivalProbs: Record<string, number>,
  ecosystemStability: number,
  climate: ClimateParams
): Recommendation[] {
  const recs: Recommendation[] = [];

  // Per-species recommendations
  for (const agent of agents) {
    const prob = survivalProbs[agent.species.name] ?? 0;

    if (prob < 0.3) {
      recs.push({
        type: 'delay',
        priority: 'high',
        title: `Delay ${agent.species.name} reintroduction`,
        description: `Survival probability is critically low (${(prob * 100).toFixed(0)}%). Consider habitat restoration before reintroduction.`,
        metric: prob,
      });
    } else if (prob < 0.6) {
      recs.push({
        type: 'genetic',
        priority: 'medium',
        title: `Increase genetic diversity for ${agent.species.name}`,
        description: `Moderate survival risk. Genetic fitness score: ${(agent.geneticFitness.overall * 100).toFixed(0)}%. Consider sourcing from multiple populations.`,
        metric: agent.geneticFitness.overall,
      });
    } else {
      recs.push({
        type: 'proceed',
        priority: 'low',
        title: `${agent.species.name} reintroduction viable`,
        description: `Good survival probability (${(prob * 100).toFixed(0)}%). Conditions are favorable for reintroduction.`,
        metric: prob,
      });
    }

    // Population size recommendations
    const optimalPop = Math.round(agent.species.carryingCapacity * 0.15);
    if (agent.population < optimalPop * 0.5) {
      recs.push({
        type: 'population',
        priority: 'high',
        title: `Increase initial ${agent.species.name} population`,
        description: `Current starting population (${agent.population}) is below recommended minimum (${optimalPop}). Allee effects may cause decline.`,
        metric: optimalPop,
      });
    }
  }

  // Ecosystem-level recommendations
  if (ecosystemStability < 0.4) {
    recs.push({
      type: 'delay',
      priority: 'high',
      title: 'Ecosystem instability detected',
      description: `Stability score: ${(ecosystemStability * 100).toFixed(0)}%. Consider phased reintroduction to reduce cascading disruptions.`,
      metric: ecosystemStability,
    });
  }

  // Climate-specific
  if (climate.scenario === 'rcp85') {
    recs.push({
      type: 'genetic',
      priority: 'high',
      title: 'Climate-adapted genetics recommended',
      description: 'Under RCP 8.5 warming, select for climate-resilient phenotypes. Consider assisted gene flow from warmer-adapted populations.',
    });
  }

  // Timing
  const predators = agents.filter(a => a.species.trophicLevel >= 3);
  const herbivores = agents.filter(a => a.species.trophicLevel <= 2);
  if (predators.length > 0 && herbivores.length > 0) {
    recs.push({
      type: 'timing',
      priority: 'medium',
      title: 'Stagger predator reintroduction',
      description: 'Introduce herbivore populations 2-3 years before apex predators to establish prey base and reduce initial predator mortality.',
    });
  }

  return recs.sort((a, b) => {
    const p = { high: 0, medium: 1, low: 2 };
    return p[a.priority] - p[b.priority];
  });
}
