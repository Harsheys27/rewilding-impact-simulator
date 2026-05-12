import type { SimulationConfig } from './types';
import { createSpeciesAgent } from './dataPipeline';

export interface ValidationCase {
  name: string;
  description: string;
  year: string;
  location: string;
  config: Omit<SimulationConfig, 'species'> & { speciesSetup: { name: string; pop: number }[] };
  knownOutcome: { species: string; data: number[] }[];
}

export const VALIDATION_SCENARIOS: ValidationCase[] = [
  {
    name: 'Yellowstone Wolf Reintroduction',
    description: 'In 1995, 14 gray wolves were reintroduced to Yellowstone. By 2020, the population stabilized around 100. Elk populations declined from ~20,000 to ~6,000, triggering trophic cascades that restored riparian vegetation and beaver populations.',
    year: '1995-2025',
    location: 'Yellowstone, USA',
    config: {
      climate: { scenario: 'current', baseTemp: 6, tempChangePerYear: 0.02, precipitationChange: 1.0, extremeEventFrequency: 2 },
      years: 30,
      location: 'Yellowstone, USA',
      monteCarloRuns: 50,
      useGeneticOptimization: false,
      speciesSetup: [
        { name: 'Gray Wolf', pop: 14 },
        { name: 'Elk', pop: 20000 },
        { name: 'Beaver', pop: 200 },
      ],
    },
    knownOutcome: [
      { species: 'Gray Wolf', data: [14, 30, 50, 80, 100, 120, 105, 95, 100, 98, 95, 100, 105, 98, 94, 100, 108, 95, 90, 95, 100, 105, 98, 95, 94, 97, 100, 105, 98, 95, 100] },
      { species: 'Elk', data: [20000, 18000, 16000, 14000, 12500, 11000, 10000, 9000, 8500, 8000, 7500, 7200, 7000, 6800, 6500, 6300, 6200, 6100, 6000, 6000, 5900, 6000, 6100, 6000, 5900, 6000, 6100, 6000, 6000, 6000, 6000] },
      { species: 'Beaver', data: [200, 220, 250, 300, 400, 550, 700, 900, 1100, 1300, 1500, 1700, 1900, 2100, 2300, 2500, 2600, 2700, 2800, 2900, 3000, 3100, 3200, 3300, 3400, 3500, 3600, 3700, 3800, 3900, 4000] },
    ],
  },
];

export function getValidationConfig(scenario: ValidationCase): SimulationConfig {
  const agents = scenario.config.speciesSetup
    .map(s => createSpeciesAgent(s.name, s.pop, false))
    .filter(Boolean) as NonNullable<ReturnType<typeof createSpeciesAgent>>[];

  return {
    ...scenario.config,
    species: agents,
  };
}
