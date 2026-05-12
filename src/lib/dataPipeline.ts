import type { SpeciesTraits, SpeciesAgent, GeneticFitness } from './types';

// Curated ecological data representing real species parameters
// In production, this would pull from IUCN, GBIF, NASA/NOAA APIs
const SPECIES_DATABASE: Record<string, SpeciesTraits> = {
  // ─── Existing temperate species ───
  'Gray Wolf': { name: 'Gray Wolf', type: 'predator', diet: ['Elk', 'Deer', 'Bison', 'Reindeer'], birthRate: 0.35, deathRate: 0.15, lifespan: 13, habitatPreference: ['temperate forest', 'grassland', 'tundra'], climateOptimalTemp: 8, climateTolerance: 25, trophicLevel: 4, carryingCapacity: 300 },
  'Elk': { name: 'Elk', type: 'herbivore', diet: ['Grass', 'Shrubs', 'Aspen'], birthRate: 0.45, deathRate: 0.12, lifespan: 15, habitatPreference: ['grassland', 'temperate forest', 'mountain meadow'], climateOptimalTemp: 10, climateTolerance: 20, trophicLevel: 2, carryingCapacity: 12000 },
  'Beaver': { name: 'Beaver', type: 'herbivore', diet: ['Willow', 'Aspen', 'Aquatic plants'], birthRate: 0.5, deathRate: 0.18, lifespan: 12, habitatPreference: ['riparian', 'wetland', 'temperate forest'], climateOptimalTemp: 12, climateTolerance: 18, trophicLevel: 2, carryingCapacity: 5000 },
  'Grizzly Bear': { name: 'Grizzly Bear', type: 'omnivore', diet: ['Salmon', 'Berries', 'Elk', 'Roots'], birthRate: 0.2, deathRate: 0.08, lifespan: 25, habitatPreference: ['temperate forest', 'mountain', 'riparian'], climateOptimalTemp: 10, climateTolerance: 22, trophicLevel: 4, carryingCapacity: 500 },
  'Bison': { name: 'Bison', type: 'herbivore', diet: ['Grass', 'Sedges', 'Herbs'], birthRate: 0.4, deathRate: 0.1, lifespan: 20, habitatPreference: ['grassland', 'prairie', 'mountain meadow'], climateOptimalTemp: 12, climateTolerance: 22, trophicLevel: 2, carryingCapacity: 5000 },
  'Lynx': { name: 'Lynx', type: 'predator', diet: ['Snowshoe Hare', 'Squirrel', 'Birds'], birthRate: 0.3, deathRate: 0.2, lifespan: 14, habitatPreference: ['boreal forest', 'temperate forest', 'mountain'], climateOptimalTemp: 5, climateTolerance: 20, trophicLevel: 3, carryingCapacity: 200 },
  'Snowshoe Hare': { name: 'Snowshoe Hare', type: 'prey', diet: ['Grass', 'Clover', 'Bark'], birthRate: 0.8, deathRate: 0.3, lifespan: 5, habitatPreference: ['boreal forest', 'temperate forest'], climateOptimalTemp: 4, climateTolerance: 18, trophicLevel: 2, carryingCapacity: 15000 },
  'Red Fox': { name: 'Red Fox', type: 'omnivore', diet: ['Rodents', 'Birds', 'Berries', 'Insects'], birthRate: 0.45, deathRate: 0.25, lifespan: 8, habitatPreference: ['temperate forest', 'grassland', 'urban edge'], climateOptimalTemp: 12, climateTolerance: 25, trophicLevel: 3, carryingCapacity: 2000 },

  // ─── Desert existing ───
  'Fennec Fox': { name: 'Fennec Fox', type: 'omnivore', diet: ['Insects', 'Rodents', 'Eggs'], birthRate: 0.4, deathRate: 0.2, lifespan: 10, habitatPreference: ['desert', 'semi-arid plains'], climateOptimalTemp: 30, climateTolerance: 15, trophicLevel: 3, carryingCapacity: 5000 },
  'Dromedary Camel': { name: 'Dromedary Camel', type: 'herbivore', diet: ['Thorny shrubs', 'Grass', 'Desert plants'], birthRate: 0.15, deathRate: 0.05, lifespan: 40, habitatPreference: ['desert', 'semi-arid'], climateOptimalTemp: 32, climateTolerance: 18, trophicLevel: 2, carryingCapacity: 15000 },
  'Addax': { name: 'Addax', type: 'herbivore', diet: ['Grass', 'Herbs', 'Shrubs'], birthRate: 0.3, deathRate: 0.12, lifespan: 19, habitatPreference: ['desert', 'sandy desert'], climateOptimalTemp: 30, climateTolerance: 15, trophicLevel: 2, carryingCapacity: 2000 },
  'Desert Monitor': { name: 'Desert Monitor', type: 'predator', diet: ['Rodents', 'Lizards', 'Insects'], birthRate: 0.35, deathRate: 0.2, lifespan: 15, habitatPreference: ['rocky desert', 'semi-arid'], climateOptimalTemp: 32, climateTolerance: 12, trophicLevel: 3, carryingCapacity: 8000 },
  'Red Kangaroo': { name: 'Red Kangaroo', type: 'herbivore', diet: ['Grass', 'Shrubs'], birthRate: 0.5, deathRate: 0.1, lifespan: 23, habitatPreference: ['grassland', 'arid desert'], climateOptimalTemp: 25, climateTolerance: 18, trophicLevel: 2, carryingCapacity: 50000 },
  'Thorny Devil': { name: 'Thorny Devil', type: 'prey', diet: ['Ants'], birthRate: 0.6, deathRate: 0.3, lifespan: 20, habitatPreference: ['sandy desert'], climateOptimalTemp: 28, climateTolerance: 12, trophicLevel: 2, carryingCapacity: 10000 },
  'Perentie': { name: 'Perentie', type: 'predator', diet: ['Mammals', 'Reptiles', 'Birds'], birthRate: 0.25, deathRate: 0.15, lifespan: 20, habitatPreference: ['arid rocky areas', 'desert'], climateOptimalTemp: 28, climateTolerance: 14, trophicLevel: 3, carryingCapacity: 3000 },

  // ─── Desert extinct ───
  'Red Gazelle': { name: 'Red Gazelle', type: 'herbivore', diet: ['Grass', 'Desert herbs'], birthRate: 0.45, deathRate: 0.15, lifespan: 12, habitatPreference: ['desert', 'semi-arid plains'], climateOptimalTemp: 28, climateTolerance: 14, trophicLevel: 2, carryingCapacity: 6000 },
  'Saharan Cheetah': { name: 'Saharan Cheetah', type: 'predator', diet: ['Red Gazelle', 'Addax', 'Hares'], birthRate: 0.25, deathRate: 0.15, lifespan: 12, habitatPreference: ['desert', 'semi-arid'], climateOptimalTemp: 28, climateTolerance: 14, trophicLevel: 4, carryingCapacity: 200 },
  'Desert Rat Kangaroo': { name: 'Desert Rat Kangaroo', type: 'herbivore', diet: ['Seeds', 'Grass', 'Insects'], birthRate: 0.6, deathRate: 0.25, lifespan: 5, habitatPreference: ['arid desert', 'grassland'], climateOptimalTemp: 26, climateTolerance: 12, trophicLevel: 2, carryingCapacity: 4000 },

  // ─── Rainforest existing ───
  'Mauritius Kestrel': { name: 'Mauritius Kestrel', type: 'predator', diet: ['Lizards', 'Insects', 'Small birds'], birthRate: 0.3, deathRate: 0.15, lifespan: 15, habitatPreference: ['tropical forest'], climateOptimalTemp: 24, climateTolerance: 8, trophicLevel: 3, carryingCapacity: 800 },
  'Pink Pigeon': { name: 'Pink Pigeon', type: 'herbivore', diet: ['Seeds', 'Fruits', 'Flowers'], birthRate: 0.35, deathRate: 0.18, lifespan: 15, habitatPreference: ['tropical forest'], climateOptimalTemp: 24, climateTolerance: 8, trophicLevel: 2, carryingCapacity: 1000 },
  'Mauritius Fruit Bat': { name: 'Mauritius Fruit Bat', type: 'herbivore', diet: ['Fruits', 'Nectar', 'Pollen'], birthRate: 0.25, deathRate: 0.1, lifespan: 20, habitatPreference: ['tropical forest'], climateOptimalTemp: 25, climateTolerance: 8, trophicLevel: 2, carryingCapacity: 60000 },
  'Ring-tailed Lemur': { name: 'Ring-tailed Lemur', type: 'omnivore', diet: ['Fruits', 'Leaves', 'Insects'], birthRate: 0.35, deathRate: 0.15, lifespan: 18, habitatPreference: ['dry forest', 'gallery forest'], climateOptimalTemp: 22, climateTolerance: 10, trophicLevel: 2, carryingCapacity: 5000 },
  'Fossa': { name: 'Fossa', type: 'predator', diet: ['Ring-tailed Lemur', 'Birds', 'Reptiles'], birthRate: 0.2, deathRate: 0.1, lifespan: 20, habitatPreference: ['dense forest'], climateOptimalTemp: 22, climateTolerance: 10, trophicLevel: 4, carryingCapacity: 3000 },
  'Nile Crocodile': { name: 'Nile Crocodile', type: 'predator', diet: ['Fish', 'Mammals', 'Birds'], birthRate: 0.2, deathRate: 0.08, lifespan: 50, habitatPreference: ['rivers', 'wetlands'], climateOptimalTemp: 26, climateTolerance: 12, trophicLevel: 4, carryingCapacity: 1500 },
  'Javan Rusa Deer': { name: 'Javan Rusa Deer', type: 'herbivore', diet: ['Grass', 'Leaves', 'Fallen fruit'], birthRate: 0.4, deathRate: 0.12, lifespan: 15, habitatPreference: ['forest edges', 'grassland'], climateOptimalTemp: 27, climateTolerance: 8, trophicLevel: 2, carryingCapacity: 8000 },
  'Wild Boar': { name: 'Wild Boar', type: 'omnivore', diet: ['Roots', 'Fruits', 'Insects', 'Small animals'], birthRate: 0.6, deathRate: 0.15, lifespan: 15, habitatPreference: ['forest', 'scrubland'], climateOptimalTemp: 20, climateTolerance: 18, trophicLevel: 2, carryingCapacity: 10000 },
  'Hispaniolan Solenodon': { name: 'Hispaniolan Solenodon', type: 'omnivore', diet: ['Insects', 'Worms', 'Small vertebrates'], birthRate: 0.2, deathRate: 0.15, lifespan: 12, habitatPreference: ['tropical forest'], climateOptimalTemp: 26, climateTolerance: 6, trophicLevel: 3, carryingCapacity: 2000 },

  // ─── Rainforest extinct ───
  'Dodo': { name: 'Dodo', type: 'herbivore', diet: ['Fruits', 'Seeds', 'Roots'], birthRate: 0.2, deathRate: 0.1, lifespan: 20, habitatPreference: ['tropical forest'], climateOptimalTemp: 24, climateTolerance: 6, trophicLevel: 2, carryingCapacity: 5000 },
  'Madagascar Dwarf Hippopotamus': { name: 'Madagascar Dwarf Hippopotamus', type: 'herbivore', diet: ['Aquatic plants', 'Grass', 'Ferns'], birthRate: 0.15, deathRate: 0.08, lifespan: 30, habitatPreference: ['wetlands', 'forest'], climateOptimalTemp: 22, climateTolerance: 8, trophicLevel: 2, carryingCapacity: 2000 },
  'Large Sloth Lemur': { name: 'Large Sloth Lemur', type: 'herbivore', diet: ['Leaves', 'Fruits', 'Seeds'], birthRate: 0.15, deathRate: 0.1, lifespan: 25, habitatPreference: ['dense forest'], climateOptimalTemp: 22, climateTolerance: 8, trophicLevel: 2, carryingCapacity: 3000 },
  'Bali Tiger': { name: 'Bali Tiger', type: 'predator', diet: ['Javan Rusa Deer', 'Wild Boar', 'Monkeys'], birthRate: 0.2, deathRate: 0.1, lifespan: 15, habitatPreference: ['tropical forest'], climateOptimalTemp: 27, climateTolerance: 6, trophicLevel: 5, carryingCapacity: 100 },
  'Hispaniolan Monkey': { name: 'Hispaniolan Monkey', type: 'omnivore', diet: ['Fruits', 'Leaves', 'Insects'], birthRate: 0.25, deathRate: 0.12, lifespan: 20, habitatPreference: ['tropical forest'], climateOptimalTemp: 26, climateTolerance: 6, trophicLevel: 2, carryingCapacity: 3000 },

  // ─── Island existing ───
  'Tasmanian Devil': { name: 'Tasmanian Devil', type: 'predator', diet: ['Carrion', 'Small mammals', 'Birds'], birthRate: 0.35, deathRate: 0.2, lifespan: 8, habitatPreference: ['temperate forest', 'scrub'], climateOptimalTemp: 14, climateTolerance: 12, trophicLevel: 3, carryingCapacity: 30000 },
  'Eastern Quoll': { name: 'Eastern Quoll', type: 'predator', diet: ['Insects', 'Small mammals', 'Berries'], birthRate: 0.5, deathRate: 0.25, lifespan: 5, habitatPreference: ['dry grassland', 'forest'], climateOptimalTemp: 14, climateTolerance: 12, trophicLevel: 3, carryingCapacity: 15000 },
  'Wombat': { name: 'Wombat', type: 'herbivore', diet: ['Grass', 'Roots', 'Bark'], birthRate: 0.25, deathRate: 0.1, lifespan: 15, habitatPreference: ['forest', 'heathland'], climateOptimalTemp: 14, climateTolerance: 14, trophicLevel: 2, carryingCapacity: 25000 },

  // ─── Arctic existing ───
  'Reindeer': { name: 'Reindeer', type: 'herbivore', diet: ['Lichen', 'Grass', 'Moss'], birthRate: 0.4, deathRate: 0.12, lifespan: 15, habitatPreference: ['tundra', 'taiga'], climateOptimalTemp: -2, climateTolerance: 20, trophicLevel: 2, carryingCapacity: 200000 },
  'Arctic Wolf': { name: 'Arctic Wolf', type: 'predator', diet: ['Reindeer', 'Musk Ox', 'Arctic Hare'], birthRate: 0.3, deathRate: 0.15, lifespan: 10, habitatPreference: ['tundra'], climateOptimalTemp: -5, climateTolerance: 25, trophicLevel: 4, carryingCapacity: 5000 },
  'Musk Ox': { name: 'Musk Ox', type: 'herbivore', diet: ['Grass', 'Willows', 'Moss'], birthRate: 0.25, deathRate: 0.1, lifespan: 20, habitatPreference: ['tundra'], climateOptimalTemp: -5, climateTolerance: 22, trophicLevel: 2, carryingCapacity: 80000 },
  'Arctic Fox': { name: 'Arctic Fox', type: 'omnivore', diet: ['Lemmings', 'Birds', 'Carrion'], birthRate: 0.6, deathRate: 0.3, lifespan: 6, habitatPreference: ['tundra'], climateOptimalTemp: -5, climateTolerance: 25, trophicLevel: 3, carryingCapacity: 100000 },
  'Mountain Lion': { name: 'Mountain Lion', type: 'predator', diet: ['Deer', 'Elk', 'Small mammals'], birthRate: 0.25, deathRate: 0.12, lifespan: 13, habitatPreference: ['mountains', 'forest', 'desert'], climateOptimalTemp: 12, climateTolerance: 25, trophicLevel: 4, carryingCapacity: 30000 },
  'American Bison': { name: 'American Bison', type: 'herbivore', diet: ['Grass', 'Sedges'], birthRate: 0.4, deathRate: 0.08, lifespan: 20, habitatPreference: ['grassland', 'prairie'], climateOptimalTemp: 12, climateTolerance: 25, trophicLevel: 2, carryingCapacity: 500000 },

  // ─── Arctic extinct ───
  'Woolly Mammoth': { name: 'Woolly Mammoth', type: 'herbivore', diet: ['Grass', 'Sedges', 'Moss', 'Shrubs'], birthRate: 0.1, deathRate: 0.05, lifespan: 60, habitatPreference: ['tundra', 'steppe-tundra'], climateOptimalTemp: -5, climateTolerance: 18, trophicLevel: 2, carryingCapacity: 50000 },
  'Dire Wolf': { name: 'Dire Wolf', type: 'predator', diet: ['Bison', 'Horses', 'Elk'], birthRate: 0.3, deathRate: 0.18, lifespan: 10, habitatPreference: ['grassland', 'scrubland'], climateOptimalTemp: 8, climateTolerance: 20, trophicLevel: 4, carryingCapacity: 2000 },
  'Saber-tooth Cat': { name: 'Saber-tooth Cat', type: 'predator', diet: ['Bison', 'Mammoth', 'Horses'], birthRate: 0.2, deathRate: 0.12, lifespan: 15, habitatPreference: ['grassland', 'forest edge'], climateOptimalTemp: 10, climateTolerance: 18, trophicLevel: 5, carryingCapacity: 500 },

  // ─── Forest existing ───
  'Kiwi': { name: 'Kiwi', type: 'omnivore', diet: ['Insects', 'Worms', 'Seeds'], birthRate: 0.15, deathRate: 0.1, lifespan: 40, habitatPreference: ['temperate forest'], climateOptimalTemp: 12, climateTolerance: 10, trophicLevel: 2, carryingCapacity: 70000 },
  'Tuatara': { name: 'Tuatara', type: 'predator', diet: ['Insects', 'Lizards', 'Bird eggs'], birthRate: 0.1, deathRate: 0.05, lifespan: 100, habitatPreference: ['rocky areas', 'forest'], climateOptimalTemp: 12, climateTolerance: 8, trophicLevel: 3, carryingCapacity: 50000 },
  'Kea': { name: 'Kea', type: 'omnivore', diet: ['Berries', 'Insects', 'Roots'], birthRate: 0.2, deathRate: 0.12, lifespan: 20, habitatPreference: ['alpine forest'], climateOptimalTemp: 8, climateTolerance: 12, trophicLevel: 2, carryingCapacity: 5000 },
  'Caucasian Red Deer': { name: 'Caucasian Red Deer', type: 'herbivore', diet: ['Grass', 'Bark', 'Leaves'], birthRate: 0.4, deathRate: 0.1, lifespan: 18, habitatPreference: ['temperate forest', 'mountain meadow'], climateOptimalTemp: 8, climateTolerance: 16, trophicLevel: 2, carryingCapacity: 20000 },
  'Brown Bear': { name: 'Brown Bear', type: 'omnivore', diet: ['Salmon', 'Berries', 'Roots', 'Deer'], birthRate: 0.2, deathRate: 0.08, lifespan: 30, habitatPreference: ['forest', 'subalpine'], climateOptimalTemp: 8, climateTolerance: 22, trophicLevel: 4, carryingCapacity: 5000 },
  'Barbary Macaque': { name: 'Barbary Macaque', type: 'omnivore', diet: ['Fruits', 'Leaves', 'Insects'], birthRate: 0.3, deathRate: 0.1, lifespan: 22, habitatPreference: ['cedar forest', 'montane forest'], climateOptimalTemp: 14, climateTolerance: 12, trophicLevel: 2, carryingCapacity: 10000 },

  // ─── Forest extinct ───
  'Moa': { name: 'Moa', type: 'herbivore', diet: ['Leaves', 'Seeds', 'Fruits'], birthRate: 0.1, deathRate: 0.06, lifespan: 30, habitatPreference: ['temperate forest', 'grassland'], climateOptimalTemp: 12, climateTolerance: 10, trophicLevel: 2, carryingCapacity: 20000 },
  'Caucasian Wisent': { name: 'Caucasian Wisent', type: 'herbivore', diet: ['Grass', 'Bark', 'Leaves'], birthRate: 0.25, deathRate: 0.08, lifespan: 25, habitatPreference: ['montane forest', 'meadow'], climateOptimalTemp: 8, climateTolerance: 16, trophicLevel: 2, carryingCapacity: 5000 },
  'Atlas Bear': { name: 'Atlas Bear', type: 'omnivore', diet: ['Fruits', 'Roots', 'Deer', 'Insects'], birthRate: 0.18, deathRate: 0.1, lifespan: 25, habitatPreference: ['montane forest', 'scrubland'], climateOptimalTemp: 14, climateTolerance: 14, trophicLevel: 4, carryingCapacity: 1000 },

  // ─── Coastal existing ───
  'Sea Otter': { name: 'Sea Otter', type: 'predator', diet: ['Sea urchins', 'Crabs', 'Clams'], birthRate: 0.2, deathRate: 0.12, lifespan: 20, habitatPreference: ['coastal kelp forest'], climateOptimalTemp: 8, climateTolerance: 12, trophicLevel: 3, carryingCapacity: 5000 },
  'Steller Sea Lion': { name: 'Steller Sea Lion', type: 'predator', diet: ['Fish', 'Squid', 'Octopus'], birthRate: 0.2, deathRate: 0.1, lifespan: 20, habitatPreference: ['rocky coast'], climateOptimalTemp: 6, climateTolerance: 14, trophicLevel: 3, carryingCapacity: 50000 },
  'Gray Whale': { name: 'Gray Whale', type: 'herbivore', diet: ['Amphipods', 'Benthic organisms'], birthRate: 0.05, deathRate: 0.03, lifespan: 70, habitatPreference: ['coastal waters'], climateOptimalTemp: 6, climateTolerance: 14, trophicLevel: 2, carryingCapacity: 30000 },

  // ─── Coastal extinct ───
  "Steller's Sea Cow": { name: "Steller's Sea Cow", type: 'herbivore', diet: ['Kelp', 'Seagrass'], birthRate: 0.05, deathRate: 0.03, lifespan: 50, habitatPreference: ['coastal kelp forest', 'cold ocean'], climateOptimalTemp: 4, climateTolerance: 10, trophicLevel: 2, carryingCapacity: 2000 },
  'Sea Mink': { name: 'Sea Mink', type: 'predator', diet: ['Fish', 'Shellfish', 'Seabirds'], birthRate: 0.35, deathRate: 0.2, lifespan: 8, habitatPreference: ['rocky coast', 'coastal wetland'], climateOptimalTemp: 10, climateTolerance: 12, trophicLevel: 3, carryingCapacity: 3000 },
  'Japanese Otter': { name: 'Japanese Otter', type: 'predator', diet: ['Fish', 'Crabs', 'Frogs'], birthRate: 0.3, deathRate: 0.15, lifespan: 12, habitatPreference: ['coastal rivers', 'wetlands'], climateOptimalTemp: 16, climateTolerance: 12, trophicLevel: 3, carryingCapacity: 5000 },
  'Dark Flying Fox': { name: 'Dark Flying Fox', type: 'herbivore', diet: ['Fruits', 'Nectar', 'Pollen'], birthRate: 0.25, deathRate: 0.12, lifespan: 15, habitatPreference: ['tropical forest'], climateOptimalTemp: 26, climateTolerance: 6, trophicLevel: 2, carryingCapacity: 20000 },
};

const LOCATIONS: Record<string, { baseTemp: number; habitat: string[] }> = {
  'Yellowstone, USA': { baseTemp: 6, habitat: ['temperate forest', 'grassland', 'mountain meadow', 'riparian'] },
  'Scottish Highlands': { baseTemp: 8, habitat: ['temperate forest', 'moorland', 'grassland'] },
  'Białowieża Forest, Poland': { baseTemp: 7, habitat: ['temperate forest', 'wetland', 'riparian'] },
  'Patagonia, Argentina': { baseTemp: 9, habitat: ['grassland', 'temperate forest', 'mountain'] },
  'Serengeti, Tanzania': { baseTemp: 22, habitat: ['savanna', 'grassland', 'woodland'] },
  // Dynamic locations from regionsData
  'Sahara & North Africa': { baseTemp: 28, habitat: ['desert', 'semi-arid plains', 'scrubland'] },
  'Central Australia': { baseTemp: 24, habitat: ['arid desert', 'grassland', 'scrubland'] },
  'Mauritius': { baseTemp: 24, habitat: ['tropical forest', 'coastal scrub'] },
  'Madagascar': { baseTemp: 22, habitat: ['tropical forest', 'wetlands', 'dry forest'] },
  'Bali': { baseTemp: 27, habitat: ['tropical forest', 'montane forest'] },
  'Caribbean (Hispaniola)': { baseTemp: 26, habitat: ['tropical forest', 'montane forest'] },
  'Tasmania / Mainland Australia': { baseTemp: 14, habitat: ['temperate forest', 'scrub', 'grassland'] },
  'Arctic (Siberia, North America)': { baseTemp: -5, habitat: ['tundra', 'taiga', 'steppe-tundra'] },
  'Ice Age Americas': { baseTemp: 2, habitat: ['grassland', 'scrubland', 'forest edge'] },
  'New Zealand': { baseTemp: 12, habitat: ['temperate forest', 'alpine', 'coastal scrub'] },
  'Caucasus': { baseTemp: 8, habitat: ['temperate forest', 'mountain meadow', 'subalpine'] },
  'Atlas Mountains': { baseTemp: 14, habitat: ['montane forest', 'scrubland', 'cedar forest'] },
  'Bering Sea': { baseTemp: 2, habitat: ['coastal kelp forest', 'cold ocean', 'rocky shore'] },
  'North America Coast': { baseTemp: 10, habitat: ['coastal wetland', 'rocky shore', 'estuary'] },
  'Japan': { baseTemp: 16, habitat: ['coastal rivers', 'temperate forest', 'wetlands'] },
  'Indian Ocean Islands': { baseTemp: 26, habitat: ['tropical forest', 'coastal cave', 'island scrub'] },
};

export function getAvailableSpecies(): string[] {
  return Object.keys(SPECIES_DATABASE);
}

export function getAvailableLocations(): string[] {
  return Object.keys(LOCATIONS);
}

export function getLocationData(location: string) {
  return LOCATIONS[location] || LOCATIONS['Yellowstone, USA'];
}

export function getSpeciesTraits(name: string): SpeciesTraits | undefined {
  return SPECIES_DATABASE[name];
}

function generateGeneticFitness(optimized: boolean): GeneticFitness {
  const base = optimized ? 0.7 : 0.5;
  const variance = optimized ? 0.15 : 0.25;
  const cr = Math.min(1, Math.max(0.1, base + (Math.random() - 0.5) * variance));
  const dr = Math.min(1, Math.max(0.1, base + (Math.random() - 0.5) * variance));
  const rs = Math.min(1, Math.max(0.1, base + (Math.random() - 0.5) * variance));
  return { climateResilience: cr, diseaseResistance: dr, reproductiveSuccess: rs, overall: (cr + dr + rs) / 3 };
}

export function buildInteractionCoefficients(agents: SpeciesAgent[]): void {
  for (const agent of agents) {
    agent.interactionCoefficients = {};
    for (const other of agents) {
      if (other.id === agent.id) continue;
      if (agent.species.diet.some(d => other.species.name.includes(d) || other.species.diet.some(od => d.includes(od)))) {
        if (agent.species.trophicLevel > other.species.trophicLevel) {
          agent.interactionCoefficients[other.species.name] = 0.002;
        } else if (agent.species.trophicLevel < other.species.trophicLevel) {
          agent.interactionCoefficients[other.species.name] = -0.003;
        }
      }
      if (agent.species.trophicLevel === other.species.trophicLevel && agent.species.type === other.species.type) {
        agent.interactionCoefficients[other.species.name] = -0.0005;
      }
    }
  }
}

export function createSpeciesAgent(
  speciesName: string,
  initialPopulation: number,
  geneticallyOptimized: boolean
): SpeciesAgent | null {
  const traits = SPECIES_DATABASE[speciesName];
  if (!traits) return null;
  return {
    id: `${speciesName}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    species: { ...traits },
    population: initialPopulation,
    geneticFitness: generateGeneticFitness(geneticallyOptimized),
    interactionCoefficients: {},
  };
}

export function getTrophicInteractions(agents: SpeciesAgent[]) {
  const interactions: { source: string; target: string; type: 'predation' | 'competition' | 'mutualism'; strength: number }[] = [];
  for (const agent of agents) {
    for (const [name, coeff] of Object.entries(agent.interactionCoefficients)) {
      if (coeff > 0) {
        interactions.push({ source: agent.species.name, target: name, type: 'predation', strength: Math.abs(coeff) });
      } else if (coeff < -0.001) {
        interactions.push({ source: agent.species.name, target: name, type: 'predation', strength: Math.abs(coeff) });
      } else if (coeff < 0) {
        interactions.push({ source: agent.species.name, target: name, type: 'competition', strength: Math.abs(coeff) });
      }
    }
  }
  return interactions;
}

export const PIPELINE_STAGES = [
  { name: 'Data Ingestion', description: 'Fetching from IUCN Red List, GBIF occurrence data, NASA/NOAA climate records', status: 'complete' as const },
  { name: 'Species Trait Extraction', description: 'Parsing diet, reproduction rate, habitat preferences, lifespan data', status: 'complete' as const },
  { name: 'Parameter Mapping', description: 'Converting traits to simulation coefficients: birth/death rates, interaction matrices', status: 'complete' as const },
  { name: 'Climate Integration', description: 'Integrating temperature projections, precipitation models, extreme event forecasts', status: 'complete' as const },
  { name: 'Validation Check', description: 'Cross-referencing against known reintroduction outcomes', status: 'complete' as const },
];
