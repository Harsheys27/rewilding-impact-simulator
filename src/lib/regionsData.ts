export interface Region {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  gradient: string;
  accentColor: string;
  particleType: 'sand' | 'leaves' | 'snow' | 'ice' | 'water' | 'pine';
  locations: Location[];
}

export interface Location {
  id: string;
  name: string;
  baseTemp: number;
  habitat: string[];
  existingSpecies: ExistingSpecies[];
  extinctSpecies: ExtinctSpecies[];
}

export interface ExistingSpecies {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  type: 'predator' | 'prey' | 'herbivore' | 'omnivore' | 'producer';
  trophicLevel: number;
  population: number;
  habitat: string;
  notes: string;
}

export interface ExtinctSpecies {
  id: string;
  name: string;
  scientificName: string;
  image: string;
  period: string;
  extinctionCause: string;
  habitat: string;
  evolvedFrom: string;
  ecologicalRole: string;
  reintroductionBenefit: string;
  type: 'predator' | 'prey' | 'herbivore' | 'omnivore' | 'producer';
  trophicLevel: number;
  viability: {
    dnaAvailability: number;
    environmentalCompatibility: number;
    geneticSimilarity: number;
    overall: number;
  };
}

export function viabilityLevel(score: number): 'Low' | 'Medium' | 'High' {
  if (score >= 0.7) return 'High';
  if (score >= 0.4) return 'Medium';
  return 'Low';
}

export const regions: Region[] = [
  // ───── DESERT / SEMI-ARID ─────
  {
    id: 'desert',
    name: 'Desert / Semi-Arid',
    subtitle: 'Arid Frontiers',
    description: 'Sun-scorched landscapes where life persists against extreme heat and scarce water.',
    gradient: 'from-amber-900/80 via-orange-800/60 to-yellow-700/40',
    accentColor: 'hsl(38 92% 55%)',
    particleType: 'sand',
    locations: [
      {
        id: 'sahara',
        name: 'Sahara & North Africa',
        baseTemp: 28,
        habitat: ['desert', 'semi-arid plains', 'scrubland'],
        existingSpecies: [
          { id: 'sahara-e1', name: 'Fennec Fox', scientificName: 'Vulpes zerda', image: '🦊', type: 'omnivore', trophicLevel: 3, population: 5000, habitat: 'Sandy desert', notes: 'Smallest canid, nocturnal predator of insects and rodents' },
          { id: 'sahara-e2', name: 'Dromedary Camel', scientificName: 'Camelus dromedarius', image: '🐫', type: 'herbivore', trophicLevel: 2, population: 15000, habitat: 'Desert, semi-arid', notes: 'Large herbivore adapted to extreme aridity' },
          { id: 'sahara-e3', name: 'Addax', scientificName: 'Addax nasomaculatus', image: '🦌', type: 'herbivore', trophicLevel: 2, population: 500, habitat: 'Sandy desert', notes: 'Critically endangered desert antelope' },
          { id: 'sahara-e4', name: 'Desert Monitor', scientificName: 'Varanus griseus', image: '🦎', type: 'predator', trophicLevel: 3, population: 8000, habitat: 'Rocky desert', notes: 'Large reptilian predator controlling rodent populations' },
        ],
        extinctSpecies: [
          {
            id: 'desert-1', name: 'Red Gazelle', scientificName: 'Eudorcas rufina', image: '🦌',
            period: 'Extinct since ~1894', extinctionCause: 'Overhunting and habitat loss in colonial North Africa.',
            habitat: 'Desert, semi-arid plains', evolvedFrom: 'Related to modern dorcas gazelle lineage.',
            ecologicalRole: 'Herbivore adapted to arid ecosystems, maintained grassland through grazing.',
            reintroductionBenefit: 'Would restore grazing pressure patterns and support predator populations.',
            type: 'herbivore', trophicLevel: 2,
            viability: { dnaAvailability: 0.2, environmentalCompatibility: 0.6, geneticSimilarity: 0.5, overall: 0.43 },
          },
          {
            id: 'desert-1b', name: 'Saharan Cheetah', scientificName: 'Acinonyx jubatus hecki', image: '🐆',
            period: 'Critically endangered since 2000s', extinctionCause: 'Habitat loss, hunting, prey depletion.',
            habitat: 'Saharan and Sahelian arid grasslands', evolvedFrom: 'Diverged from SE African cheetah ~30,000 years ago.',
            ecologicalRole: 'Apex predator controlling gazelle and hare populations.',
            reintroductionBenefit: 'Restore top-down trophic regulation, prevent overgrazing.',
            type: 'predator', trophicLevel: 4,
            viability: { dnaAvailability: 0.8, environmentalCompatibility: 0.6, geneticSimilarity: 0.9, overall: 0.77 },
          },
        ],
      },
      {
        id: 'central-australia',
        name: 'Central Australia',
        baseTemp: 24,
        habitat: ['arid desert', 'grassland', 'scrubland'],
        existingSpecies: [
          { id: 'aus-e1', name: 'Red Kangaroo', scientificName: 'Osphranter rufus', image: '🦘', type: 'herbivore', trophicLevel: 2, population: 50000, habitat: 'Grassland, open plains', notes: 'Largest marsupial, dominant grazer' },
          { id: 'aus-e2', name: 'Thorny Devil', scientificName: 'Moloch horridus', image: '🦎', type: 'prey', trophicLevel: 2, population: 10000, habitat: 'Sandy desert', notes: 'Insectivore specializing on ants' },
          { id: 'aus-e3', name: 'Perentie', scientificName: 'Varanus giganteus', image: '🦎', type: 'predator', trophicLevel: 3, population: 3000, habitat: 'Arid rocky areas', notes: 'Largest Australian monitor lizard' },
        ],
        extinctSpecies: [
          {
            id: 'desert-2', name: 'Desert Rat Kangaroo', scientificName: 'Caloprymnus campestris', image: '🦘',
            period: 'Extinct since ~1935', extinctionCause: 'Predation by introduced foxes and cats, habitat degradation.',
            habitat: 'Arid desert, grassland', evolvedFrom: 'Potoroid marsupial lineage, related to modern bettongs.',
            ecologicalRole: 'Small grazing marsupial that dispersed seeds and turned soil.',
            reintroductionBenefit: 'Seed dispersal and soil aeration in degraded arid ecosystems.',
            type: 'herbivore', trophicLevel: 2,
            viability: { dnaAvailability: 0.3, environmentalCompatibility: 0.55, geneticSimilarity: 0.6, overall: 0.48 },
          },
        ],
      },
    ],
  },

  // ───── RAINFOREST / TROPICAL ─────
  {
    id: 'rainforest',
    name: 'Rainforest / Tropical',
    subtitle: 'Emerald Canopy',
    description: 'Dense, biodiverse jungles teeming with life from canopy to forest floor.',
    gradient: 'from-emerald-900/80 via-green-800/60 to-lime-700/40',
    accentColor: 'hsl(145 65% 45%)',
    particleType: 'leaves',
    locations: [
      {
        id: 'mauritius',
        name: 'Mauritius',
        baseTemp: 24,
        habitat: ['tropical forest', 'coastal scrub'],
        existingSpecies: [
          { id: 'mau-e1', name: 'Mauritius Kestrel', scientificName: 'Falco punctatus', image: '🦅', type: 'predator', trophicLevel: 3, population: 400, habitat: 'Tropical forest', notes: 'Raptor, once world\'s rarest bird, conservation success' },
          { id: 'mau-e2', name: 'Pink Pigeon', scientificName: 'Nesoenas mayeri', image: '🕊️', type: 'herbivore', trophicLevel: 2, population: 500, habitat: 'Forest remnants', notes: 'Endemic, critical seed disperser' },
          { id: 'mau-e3', name: 'Mauritius Fruit Bat', scientificName: 'Pteropus niger', image: '🦇', type: 'herbivore', trophicLevel: 2, population: 50000, habitat: 'Forest canopy', notes: 'Key pollinator and seed disperser' },
        ],
        extinctSpecies: [
          {
            id: 'rain-1', name: 'Dodo', scientificName: 'Raphus cucullatus', image: '🦤',
            period: 'Extinct since ~1681', extinctionCause: 'Hunting by sailors, habitat destruction, and predation by introduced animals.',
            habitat: 'Tropical forest', evolvedFrom: 'Evolved from a pigeon ancestor that reached Mauritius ~8 million years ago.',
            ecologicalRole: 'Seed disperser for large-fruited trees including the tambalacoque.',
            reintroductionBenefit: 'Would restore seed dispersal networks for native trees struggling to regenerate.',
            type: 'herbivore', trophicLevel: 2,
            viability: { dnaAvailability: 0.5, environmentalCompatibility: 0.5, geneticSimilarity: 0.4, overall: 0.47 },
          },
        ],
      },
      {
        id: 'madagascar',
        name: 'Madagascar',
        baseTemp: 22,
        habitat: ['tropical forest', 'wetlands', 'dry forest'],
        existingSpecies: [
          { id: 'mad-e1', name: 'Ring-tailed Lemur', scientificName: 'Lemur catta', image: '🐒', type: 'omnivore', trophicLevel: 2, population: 2000, habitat: 'Dry forest, gallery forest', notes: 'Iconic primate, social species' },
          { id: 'mad-e2', name: 'Fossa', scientificName: 'Cryptoprocta ferox', image: '🐱', type: 'predator', trophicLevel: 4, population: 2500, habitat: 'Dense forest', notes: 'Apex predator, controls lemur populations' },
          { id: 'mad-e3', name: 'Nile Crocodile', scientificName: 'Crocodylus niloticus', image: '🐊', type: 'predator', trophicLevel: 4, population: 1000, habitat: 'Rivers, wetlands', notes: 'Aquatic apex predator' },
        ],
        extinctSpecies: [
          {
            id: 'rain-2', name: 'Madagascar Dwarf Hippopotamus', scientificName: 'Hippopotamus lemerlei', image: '🦛',
            period: 'Extinct since ~1000 CE', extinctionCause: 'Hunting by early human settlers and habitat loss.',
            habitat: 'Wetlands, forests', evolvedFrom: 'Descended from hippos that colonized Madagascar via ocean dispersal.',
            ecologicalRole: 'Megaherbivore that maintained wetland habitats through grazing and wallowing.',
            reintroductionBenefit: 'Wetland ecosystem engineering, creating habitats for other species.',
            type: 'herbivore', trophicLevel: 2,
            viability: { dnaAvailability: 0.3, environmentalCompatibility: 0.5, geneticSimilarity: 0.55, overall: 0.45 },
          },
          {
            id: 'rain-3', name: 'Large Sloth Lemur', scientificName: 'Palaeopropithecus', image: '🦥',
            period: 'Extinct since ~500 CE', extinctionCause: 'Hunting and deforestation by early human colonizers.',
            habitat: 'Dense forest', evolvedFrom: 'Evolved within the lemur radiation unique to Madagascar.',
            ecologicalRole: 'Canopy seed disperser and browser, shaped forest structure.',
            reintroductionBenefit: 'Would restore forest regeneration dynamics and canopy seed dispersal.',
            type: 'herbivore', trophicLevel: 2,
            viability: { dnaAvailability: 0.2, environmentalCompatibility: 0.45, geneticSimilarity: 0.5, overall: 0.38 },
          },
        ],
      },
      {
        id: 'bali',
        name: 'Bali',
        baseTemp: 27,
        habitat: ['tropical forest', 'montane forest'],
        existingSpecies: [
          { id: 'bali-e1', name: 'Javan Rusa Deer', scientificName: 'Rusa timorensis', image: '🦌', type: 'herbivore', trophicLevel: 2, population: 5000, habitat: 'Forest edges, grassland', notes: 'Primary large herbivore' },
          { id: 'bali-e2', name: 'Bali Myna', scientificName: 'Leucopsar rothschildi', image: '🐦', type: 'omnivore', trophicLevel: 2, population: 100, habitat: 'Dry forest', notes: 'Critically endangered endemic bird' },
          { id: 'bali-e3', name: 'Wild Boar', scientificName: 'Sus scrofa', image: '🐗', type: 'omnivore', trophicLevel: 2, population: 8000, habitat: 'Forest', notes: 'Soil disturbance, seed dispersal' },
        ],
        extinctSpecies: [
          {
            id: 'rain-4', name: 'Bali Tiger', scientificName: 'Panthera tigris balica', image: '🐅',
            period: 'Extinct since 1937', extinctionCause: 'Hunting and rapid deforestation on the island of Bali.',
            habitat: 'Tropical forest', evolvedFrom: 'Diverged from Javan tiger lineage, smallest tiger subspecies.',
            ecologicalRole: 'Apex predator controlling deer and wild pig populations.',
            reintroductionBenefit: 'Restoration of top-down trophic regulation preventing forest degradation.',
            type: 'predator', trophicLevel: 5,
            viability: { dnaAvailability: 0.3, environmentalCompatibility: 0.4, geneticSimilarity: 0.75, overall: 0.48 },
          },
        ],
      },
      {
        id: 'caribbean',
        name: 'Caribbean (Hispaniola)',
        baseTemp: 26,
        habitat: ['tropical forest', 'montane forest'],
        existingSpecies: [
          { id: 'car-e1', name: 'Hispaniolan Solenodon', scientificName: 'Solenodon paradoxus', image: '🐀', type: 'omnivore', trophicLevel: 3, population: 1000, habitat: 'Forest floor', notes: 'Venomous insectivore, living fossil' },
          { id: 'car-e2', name: 'Hispaniolan Hutia', scientificName: 'Plagiodontia aedium', image: '🐿️', type: 'herbivore', trophicLevel: 2, population: 500, habitat: 'Forest, rocky areas', notes: 'Large endemic rodent' },
        ],
        extinctSpecies: [
          {
            id: 'rain-5', name: 'Hispaniolan Monkey', scientificName: 'Xenothrix mcgregori', image: '🐒',
            period: 'Extinct since ~1500 CE', extinctionCause: 'Hunting and habitat loss following European colonization.',
            habitat: 'Tropical forest', evolvedFrom: 'Descended from South American primates that rafted to the Caribbean.',
            ecologicalRole: 'Arboreal frugivore and seed disperser in canopy ecosystems.',
            reintroductionBenefit: 'Could restore seed dispersal for native fruiting trees.',
            type: 'omnivore', trophicLevel: 2,
            viability: { dnaAvailability: 0.15, environmentalCompatibility: 0.4, geneticSimilarity: 0.35, overall: 0.3 },
          },
        ],
      },
    ],
  },

  // ───── ISLAND ECOSYSTEMS ─────
  {
    id: 'island',
    name: 'Island Ecosystems',
    subtitle: 'Isolated Worlds',
    description: 'Unique island habitats where evolution forged extraordinary species in isolation.',
    gradient: 'from-teal-900/80 via-emerald-800/60 to-cyan-700/40',
    accentColor: 'hsl(170 65% 45%)',
    particleType: 'leaves',
    locations: [
      {
        id: 'tasmania',
        name: 'Tasmania / Mainland Australia',
        baseTemp: 14,
        habitat: ['temperate forest', 'scrub', 'grassland'],
        existingSpecies: [
          { id: 'tas-e1', name: 'Tasmanian Devil', scientificName: 'Sarcophilus harrisii', image: '😈', type: 'predator', trophicLevel: 3, population: 25000, habitat: 'Forest, scrub', notes: 'Largest living carnivorous marsupial (in Tasmania)' },
          { id: 'tas-e2', name: 'Eastern Quoll', scientificName: 'Dasyurus viverrinus', image: '🐱', type: 'predator', trophicLevel: 3, population: 10000, habitat: 'Dry grassland, forest', notes: 'Small marsupial predator' },
          { id: 'tas-e3', name: 'Wombat', scientificName: 'Vombatus ursinus', image: '🐻', type: 'herbivore', trophicLevel: 2, population: 20000, habitat: 'Forest, heathland', notes: 'Burrowing herbivore, soil engineering' },
        ],
        extinctSpecies: [
          {
            id: 'island-1', name: 'Tasmanian Devil (mainland)', scientificName: 'Sarcophilus harrisii', image: '😈',
            period: 'Mainland extinct ~3,000 years ago', extinctionCause: 'Competition with dingoes and human hunting on mainland Australia.',
            habitat: 'Forest, scrub', evolvedFrom: 'Part of the dasyurid marsupial radiation.',
            ecologicalRole: 'Scavenger and mesopredator controlling small mammal populations.',
            reintroductionBenefit: 'Could reduce feral cat/fox impacts as a native mesopredator on mainland.',
            type: 'predator', trophicLevel: 3,
            viability: { dnaAvailability: 0.95, environmentalCompatibility: 0.7, geneticSimilarity: 1.0, overall: 0.88 },
          },
        ],
      },
    ],
  },

  // ───── ARCTIC / TUNDRA ─────
  {
    id: 'arctic',
    name: 'Arctic / Tundra',
    subtitle: 'Frozen Tundra',
    description: 'Vast polar landscapes of permafrost, sea ice, and resilient life.',
    gradient: 'from-sky-900/80 via-blue-800/60 to-cyan-700/40',
    accentColor: 'hsl(200 80% 55%)',
    particleType: 'snow',
    locations: [
      {
        id: 'arctic-siberia',
        name: 'Arctic (Siberia, North America)',
        baseTemp: -5,
        habitat: ['tundra', 'taiga', 'steppe-tundra'],
        existingSpecies: [
          { id: 'arc-e1', name: 'Reindeer', scientificName: 'Rangifer tarandus', image: '🦌', type: 'herbivore', trophicLevel: 2, population: 200000, habitat: 'Tundra, taiga', notes: 'Migratory grazer, key prey species' },
          { id: 'arc-e2', name: 'Arctic Wolf', scientificName: 'Canis lupus arctos', image: '🐺', type: 'predator', trophicLevel: 4, population: 5000, habitat: 'Tundra', notes: 'Apex predator of tundra ecosystems' },
          { id: 'arc-e3', name: 'Musk Ox', scientificName: 'Ovibos moschatus', image: '🐂', type: 'herbivore', trophicLevel: 2, population: 80000, habitat: 'Tundra', notes: 'Cold-adapted grazer with communal defense' },
          { id: 'arc-e4', name: 'Arctic Fox', scientificName: 'Vulpes lagopus', image: '🦊', type: 'omnivore', trophicLevel: 3, population: 100000, habitat: 'Tundra', notes: 'Small predator, scavenger' },
        ],
        extinctSpecies: [
          {
            id: 'arctic-1', name: 'Woolly Mammoth', scientificName: 'Mammuthus primigenius', image: '🦣',
            period: 'Extinct ~4,000 years ago', extinctionCause: 'Climate warming after last Ice Age combined with human hunting pressure.',
            habitat: 'Tundra', evolvedFrom: 'Evolved from steppe mammoths (M. trogontherii) ~400,000 years ago.',
            ecologicalRole: 'Megaherbivore maintaining grassland-tundra by trampling trees and recycling nutrients.',
            reintroductionBenefit: 'Could slow permafrost thaw by maintaining grasslands that reflect more sunlight.',
            type: 'herbivore', trophicLevel: 2,
            viability: { dnaAvailability: 0.7, environmentalCompatibility: 0.6, geneticSimilarity: 0.75, overall: 0.68 },
          },
        ],
      },
      {
        id: 'ice-age-americas',
        name: 'Ice Age Americas',
        baseTemp: 2,
        habitat: ['grassland', 'scrubland', 'forest edge'],
        existingSpecies: [
          { id: 'ice-e1', name: 'Gray Wolf', scientificName: 'Canis lupus', image: '🐺', type: 'predator', trophicLevel: 4, population: 15000, habitat: 'Forest, grassland', notes: 'Apex predator, analog to dire wolf niche' },
          { id: 'ice-e2', name: 'Mountain Lion', scientificName: 'Puma concolor', image: '🦁', type: 'predator', trophicLevel: 4, population: 30000, habitat: 'Mountains, forest', notes: 'Large solitary cat predator' },
          { id: 'ice-e3', name: 'American Bison', scientificName: 'Bison bison', image: '🦬', type: 'herbivore', trophicLevel: 2, population: 500000, habitat: 'Grassland, prairie', notes: 'Keystone grazer' },
        ],
        extinctSpecies: [
          {
            id: 'arctic-2', name: 'Dire Wolf', scientificName: 'Canis dirus', image: '🐺',
            period: 'Extinct ~9,500 years ago', extinctionCause: 'Loss of megafauna prey and competition with gray wolves.',
            habitat: 'Grassland, scrubland', evolvedFrom: 'Diverged from gray wolf lineage ~5.7 million years ago (separate genus).',
            ecologicalRole: 'Pack predator of large herbivores like bison and horses.',
            reintroductionBenefit: 'Theoretical megafauna predator role; modern gray wolves partially fill this niche.',
            type: 'predator', trophicLevel: 4,
            viability: { dnaAvailability: 0.4, environmentalCompatibility: 0.5, geneticSimilarity: 0.3, overall: 0.4 },
          },
          {
            id: 'arctic-3', name: 'Saber-tooth Cat', scientificName: 'Smilodon fatalis', image: '🐱',
            period: 'Extinct ~10,000 years ago', extinctionCause: 'Megafauna extinction and habitat shifts at the end of the Pleistocene.',
            habitat: 'Grassland, forest edge', evolvedFrom: 'Part of the Machairodontinae lineage, not closely related to modern cats.',
            ecologicalRole: 'Apex ambush predator specializing in megaherbivore prey.',
            reintroductionBenefit: 'No close living relative; conceptual model for de-extinction research.',
            type: 'predator', trophicLevel: 5,
            viability: { dnaAvailability: 0.2, environmentalCompatibility: 0.35, geneticSimilarity: 0.15, overall: 0.23 },
          },
        ],
      },
    ],
  },

  // ───── FOREST / TEMPERATE ─────
  {
    id: 'forest',
    name: 'Forest / Temperate',
    subtitle: 'Ancient Woodlands',
    description: 'Temperate forests and woodlands that once sheltered remarkable megafauna.',
    gradient: 'from-green-900/80 via-emerald-900/60 to-lime-900/40',
    accentColor: 'hsl(130 55% 40%)',
    particleType: 'pine',
    locations: [
      {
        id: 'new-zealand',
        name: 'New Zealand',
        baseTemp: 12,
        habitat: ['temperate forest', 'alpine', 'coastal scrub'],
        existingSpecies: [
          { id: 'nz-e1', name: 'Kiwi', scientificName: 'Apteryx mantelli', image: '🥝', type: 'omnivore', trophicLevel: 2, population: 68000, habitat: 'Forest floor', notes: 'Iconic flightless bird, insectivore' },
          { id: 'nz-e2', name: 'Tuatara', scientificName: 'Sphenodon punctatus', image: '🦎', type: 'predator', trophicLevel: 3, population: 50000, habitat: 'Rocky areas, forest', notes: 'Living fossil, last rhynchocephalian' },
          { id: 'nz-e3', name: 'Kea', scientificName: 'Nestor notabilis', image: '🦜', type: 'omnivore', trophicLevel: 2, population: 5000, habitat: 'Alpine forest', notes: 'Highly intelligent alpine parrot' },
        ],
        extinctSpecies: [
          {
            id: 'forest-1', name: 'Moa', scientificName: 'Dinornis robustus', image: '🦤',
            period: 'Extinct since ~1400 CE', extinctionCause: 'Overhunting by Māori settlers within 200 years of human arrival.',
            habitat: 'Temperate forest, grassland', evolvedFrom: 'Ratite lineage, closest living relative is the tinamou.',
            ecologicalRole: 'Giant browser shaping forest understory, seed disperser.',
            reintroductionBenefit: 'Forest regeneration through browsing and large seed dispersal.',
            type: 'herbivore', trophicLevel: 2,
            viability: { dnaAvailability: 0.5, environmentalCompatibility: 0.55, geneticSimilarity: 0.3, overall: 0.45 },
          },
        ],
      },
      {
        id: 'caucasus',
        name: 'Caucasus',
        baseTemp: 8,
        habitat: ['temperate forest', 'mountain meadow', 'subalpine'],
        existingSpecies: [
          { id: 'cau-e1', name: 'Caucasian Red Deer', scientificName: 'Cervus elaphus maral', image: '🦌', type: 'herbivore', trophicLevel: 2, population: 15000, habitat: 'Forest, meadow', notes: 'Large herbivore, primary prey' },
          { id: 'cau-e2', name: 'Caucasian Leopard', scientificName: 'Panthera pardus ciscaucasica', image: '🐆', type: 'predator', trophicLevel: 4, population: 50, habitat: 'Mountain forest', notes: 'Critically endangered apex predator' },
          { id: 'cau-e3', name: 'Brown Bear', scientificName: 'Ursus arctos', image: '🐻', type: 'omnivore', trophicLevel: 4, population: 3000, habitat: 'Forest, subalpine', notes: 'Large omnivore, seed disperser' },
        ],
        extinctSpecies: [
          {
            id: 'forest-2', name: 'Caucasian Wisent', scientificName: 'Bison bonasus caucasicus', image: '🦬',
            period: 'Extinct since 1927', extinctionCause: 'Hunting and habitat loss during wars and political instability.',
            habitat: 'Montane forest, meadows', evolvedFrom: 'Subspecies of European bison, adapted to Caucasus mountains.',
            ecologicalRole: 'Megaherbivore maintaining forest clearings and meadow habitats.',
            reintroductionBenefit: 'Forest structure management and meadow maintenance (European bison used as proxy).',
            type: 'herbivore', trophicLevel: 2,
            viability: { dnaAvailability: 0.4, environmentalCompatibility: 0.65, geneticSimilarity: 0.85, overall: 0.63 },
          },
        ],
      },
      {
        id: 'atlas-mountains',
        name: 'Atlas Mountains',
        baseTemp: 14,
        habitat: ['montane forest', 'scrubland', 'cedar forest'],
        existingSpecies: [
          { id: 'atl-e1', name: 'Barbary Macaque', scientificName: 'Macaca sylvanus', image: '🐒', type: 'omnivore', trophicLevel: 2, population: 8000, habitat: 'Cedar forest', notes: 'Only African macaque, seed disperser' },
          { id: 'atl-e2', name: 'Red Fox', scientificName: 'Vulpes vulpes', image: '🦊', type: 'omnivore', trophicLevel: 3, population: 10000, habitat: 'Scrubland, forest edge', notes: 'Mesopredator, controls rodents' },
          { id: 'atl-e3', name: 'Barbary Stag', scientificName: 'Cervus elaphus barbarus', image: '🦌', type: 'herbivore', trophicLevel: 2, population: 2000, habitat: 'Dense forest', notes: 'North African deer subspecies' },
        ],
        extinctSpecies: [
          {
            id: 'forest-3', name: 'Atlas Bear', scientificName: 'Ursus arctos crowtheri', image: '🐻',
            period: 'Extinct since ~1870s', extinctionCause: 'Hunting for sport and Roman arena games, habitat loss.',
            habitat: 'Atlas Mountain forests', evolvedFrom: 'Subspecies of brown bear isolated in North Africa.',
            ecologicalRole: 'Apex omnivore, seed disperser, controlled ungulate populations.',
            reintroductionBenefit: 'Forest regeneration through seed dispersal and ungulate population control.',
            type: 'omnivore', trophicLevel: 4,
            viability: { dnaAvailability: 0.2, environmentalCompatibility: 0.5, geneticSimilarity: 0.7, overall: 0.47 },
          },
        ],
      },
    ],
  },

  // ───── COASTAL / MARINE ─────
  {
    id: 'coastal',
    name: 'Coastal / Marine',
    subtitle: 'Ocean\'s Edge',
    description: 'Where land meets sea — rich coastal and marine ecosystems with vanishing species.',
    gradient: 'from-blue-900/80 via-cyan-800/60 to-teal-700/40',
    accentColor: 'hsl(190 70% 50%)',
    particleType: 'water',
    locations: [
      {
        id: 'bering-sea',
        name: 'Bering Sea',
        baseTemp: 2,
        habitat: ['coastal kelp forest', 'cold ocean', 'rocky shore'],
        existingSpecies: [
          { id: 'ber-e1', name: 'Sea Otter', scientificName: 'Enhydra lutris', image: '🦦', type: 'predator', trophicLevel: 3, population: 3000, habitat: 'Kelp forests', notes: 'Keystone species, controls sea urchins' },
          { id: 'ber-e2', name: 'Steller Sea Lion', scientificName: 'Eumetopias jubatus', image: '🦭', type: 'predator', trophicLevel: 3, population: 45000, habitat: 'Rocky coast', notes: 'Largest eared seal' },
          { id: 'ber-e3', name: 'Gray Whale', scientificName: 'Eschrichtius robustus', image: '🐋', type: 'herbivore', trophicLevel: 2, population: 27000, habitat: 'Coastal waters', notes: 'Benthic feeder, sediment disturbance' },
        ],
        extinctSpecies: [
          {
            id: 'coastal-1', name: 'Steller\'s Sea Cow', scientificName: 'Hydrodamalis gigas', image: '🐋',
            period: 'Extinct since 1768', extinctionCause: 'Hunted to extinction within 27 years of European discovery.',
            habitat: 'Shallow coastal kelp forests', evolvedFrom: 'Related to modern dugongs, diverged ~20 million years ago.',
            ecologicalRole: 'Kelp forest grazer maintaining algae balance in cold coastal waters.',
            reintroductionBenefit: 'Kelp forest management preventing algal overgrowth.',
            type: 'herbivore', trophicLevel: 2,
            viability: { dnaAvailability: 0.3, environmentalCompatibility: 0.4, geneticSimilarity: 0.4, overall: 0.37 },
          },
        ],
      },
      {
        id: 'north-america-coast',
        name: 'North America Coast',
        baseTemp: 10,
        habitat: ['coastal wetland', 'rocky shore', 'estuary'],
        existingSpecies: [
          { id: 'nac-e1', name: 'Sea Otter', scientificName: 'Enhydra lutris', image: '🦦', type: 'predator', trophicLevel: 3, population: 3000, habitat: 'Kelp forests', notes: 'Keystone predator of sea urchins' },
          { id: 'nac-e2', name: 'Harbor Seal', scientificName: 'Phoca vitulina', image: '🦭', type: 'predator', trophicLevel: 3, population: 75000, habitat: 'Rocky coast', notes: 'Coastal fish predator' },
          { id: 'nac-e3', name: 'American Lobster', scientificName: 'Homarus americanus', image: '🦞', type: 'omnivore', trophicLevel: 2, population: 100000, habitat: 'Rocky seafloor', notes: 'Benthic scavenger and predator' },
        ],
        extinctSpecies: [
          {
            id: 'coastal-2', name: 'Sea Mink', scientificName: 'Neogale macrodon', image: '🦦',
            period: 'Extinct since ~1860s', extinctionCause: 'Fur trade hunting to extinction along the Atlantic coast.',
            habitat: 'Rocky coastal areas', evolvedFrom: 'Closely related to American mink, adapted to marine life.',
            ecologicalRole: 'Coastal predator of fish, shellfish, and seabirds.',
            reintroductionBenefit: 'Could restore intertidal predator-prey dynamics.',
            type: 'predator', trophicLevel: 3,
            viability: { dnaAvailability: 0.2, environmentalCompatibility: 0.55, geneticSimilarity: 0.8, overall: 0.52 },
          },
        ],
      },
      {
        id: 'japan-coast',
        name: 'Japan',
        baseTemp: 16,
        habitat: ['coastal rivers', 'temperate forest', 'wetlands'],
        existingSpecies: [
          { id: 'jpn-e1', name: 'Japanese Macaque', scientificName: 'Macaca fuscata', image: '🐒', type: 'omnivore', trophicLevel: 2, population: 100000, habitat: 'Forest', notes: 'Snow monkeys, seed dispersers' },
          { id: 'jpn-e2', name: 'Giant Salamander', scientificName: 'Andrias japonicus', image: '🦎', type: 'predator', trophicLevel: 3, population: 5000, habitat: 'Mountain streams', notes: 'Largest amphibian, living fossil' },
        ],
        extinctSpecies: [
          {
            id: 'coastal-3', name: 'Japanese Otter', scientificName: 'Lutra nippon', image: '🦦',
            period: 'Extinct since 2012 (declared)', extinctionCause: 'Habitat loss, water pollution, and hunting for fur.',
            habitat: 'Coastal rivers, wetlands', evolvedFrom: 'Subspecies of Eurasian otter isolated in Japan.',
            ecologicalRole: 'River and coastal predator controlling fish and crustacean populations.',
            reintroductionBenefit: 'Water quality indicator and fish population regulation.',
            type: 'predator', trophicLevel: 3,
            viability: { dnaAvailability: 0.5, environmentalCompatibility: 0.6, geneticSimilarity: 0.9, overall: 0.67 },
          },
        ],
      },
      {
        id: 'indian-ocean',
        name: 'Indian Ocean Islands',
        baseTemp: 26,
        habitat: ['tropical forest', 'coastal cave', 'island scrub'],
        existingSpecies: [
          { id: 'ind-e1', name: 'Aldabra Giant Tortoise', scientificName: 'Aldabrachelys gigantea', image: '🐢', type: 'herbivore', trophicLevel: 2, population: 100000, habitat: 'Scrubland', notes: 'Ecosystem engineer through grazing' },
          { id: 'ind-e2', name: 'Coconut Crab', scientificName: 'Birgus latro', image: '🦀', type: 'omnivore', trophicLevel: 2, population: 50000, habitat: 'Coastal forest', notes: 'Largest terrestrial arthropod' },
        ],
        extinctSpecies: [
          {
            id: 'coastal-4', name: 'Dark Flying Fox', scientificName: 'Pteropus subniger', image: '🦇',
            period: 'Extinct since ~1870s', extinctionCause: 'Hunting and deforestation on Mauritius and Réunion.',
            habitat: 'Tropical forest canopy', evolvedFrom: 'Part of the Old World fruit bat radiation.',
            ecologicalRole: 'Pollinator and seed disperser for tropical trees.',
            reintroductionBenefit: 'Would restore pollination and seed dispersal for native trees.',
            type: 'herbivore', trophicLevel: 2,
            viability: { dnaAvailability: 0.15, environmentalCompatibility: 0.5, geneticSimilarity: 0.55, overall: 0.4 },
          },
        ],
      },
    ],
  },
];

// Helper to get all locations across all regions
export function getAllLocations(): { region: Region; location: Location }[] {
  return regions.flatMap(r => r.locations.map(l => ({ region: r, location: l })));
}

// Flatten all species counts for a region
export function getRegionSpeciesCount(region: Region): { existing: number; extinct: number } {
  return {
    existing: region.locations.reduce((sum, l) => sum + l.existingSpecies.length, 0),
    extinct: region.locations.reduce((sum, l) => sum + l.extinctSpecies.length, 0),
  };
}
