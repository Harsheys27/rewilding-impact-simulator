export interface SpeciesTraits {
  name: string;
  type: 'predator' | 'prey' | 'herbivore' | 'omnivore' | 'producer';
  diet: string[];
  birthRate: number;       // offspring per year per individual
  deathRate: number;       // natural mortality rate
  lifespan: number;        // years
  habitatPreference: string[];
  climateOptimalTemp: number;  // °C
  climateTolerance: number;    // ± °C range
  trophicLevel: number;
  carryingCapacity: number;
}

export interface SpeciesAgent {
  id: string;
  species: SpeciesTraits;
  population: number;
  geneticFitness: GeneticFitness;
  interactionCoefficients: Record<string, number>; // species name -> coefficient
}

export interface GeneticFitness {
  climateResilience: number;      // 0-1
  diseaseResistance: number;      // 0-1
  reproductiveSuccess: number;    // 0-1
  overall: number;                // computed average
}

export type ClimateScenario = 'current' | 'rcp45' | 'rcp85';

export interface ClimateParams {
  scenario: ClimateScenario;
  baseTemp: number;
  tempChangePerYear: number;
  precipitationChange: number;    // multiplier
  extremeEventFrequency: number;  // events per decade
}

export interface SimulationConfig {
  species: SpeciesAgent[];
  climate: ClimateParams;
  years: number;
  location: string;
  monteCarloRuns: number;
  useGeneticOptimization: boolean;
}

export interface SimulationStep {
  year: number;
  populations: Record<string, number>;
  ecosystemHealth: number;
  temperature: number;
  extinctions: string[];
}

export interface SimulationResult {
  steps: SimulationStep[];
  finalPopulations: Record<string, number>;
  survivalProbabilities: Record<string, number>;
  ecosystemStability: number;
  recommendations: Recommendation[];
  uncertaintyBands: UncertaintyBand[];
  trophicInteractions: TrophicInteraction[];
}

export interface UncertaintyBand {
  year: number;
  species: string;
  mean: number;
  lower5: number;
  upper95: number;
  lower25: number;
  upper75: number;
}

export interface TrophicInteraction {
  source: string;
  target: string;
  type: 'predation' | 'competition' | 'mutualism';
  strength: number;
}

export interface Recommendation {
  type: 'population' | 'timing' | 'genetic' | 'delay' | 'proceed';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  metric?: number;
}

export interface ValidationScenario {
  name: string;
  description: string;
  config: SimulationConfig;
  knownOutcome: Record<string, number[]>; // species -> population timeline
}
