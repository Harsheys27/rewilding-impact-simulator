import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, MapPin, Plus, Minus, Play } from 'lucide-react';
import { regions } from '@/lib/regionsData';
import type { ExtinctSpecies, ExistingSpecies, Location } from '@/lib/regionsData';
import { SpeciesCard } from '@/components/SpeciesCard';
import { SpeciesModal } from '@/components/SpeciesModal';
import { Button } from '@/components/ui/button';

type SpeciesForSim = { name: string; population: number; isExtinct: boolean };

const RegionExperience = () => {
  const { regionId } = useParams<{ regionId: string }>();
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedSpecies, setSelectedSpecies] = useState<ExtinctSpecies | null>(null);
  const [simulationList, setSimulationList] = useState<SpeciesForSim[]>([]);
  const [initialized, setInitialized] = useState<string | null>(null);

  const region = regions.find(r => r.id === regionId);

  const activeLocation = useMemo(() => {
    if (!region) return null;
    if (selectedLocation) return region.locations.find(l => l.id === selectedLocation) || null;
    return region.locations[0] || null;
  }, [region, selectedLocation]);

  // Auto-populate existing species when location changes
  if (activeLocation && initialized !== activeLocation.id) {
    const initial: SpeciesForSim[] = activeLocation.existingSpecies.map(s => ({
      name: s.name,
      population: s.population,
      isExtinct: false,
    }));
    setSimulationList(initial);
    setInitialized(activeLocation.id);
  }

  if (!region) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Region not found</p>
          <button onClick={() => navigate('/')} className="text-primary underline">Go back</button>
        </div>
      </div>
    );
  }

  const addExtinctToSim = (sp: ExtinctSpecies) => {
    if (simulationList.find(s => s.name === sp.name)) return;
    setSimulationList(prev => [...prev, { name: sp.name, population: 50, isExtinct: true }]);
  };

  const removeFromSim = (name: string) => {
    setSimulationList(prev => prev.filter(s => s.name !== name));
  };

  const isInSim = (name: string) => simulationList.some(s => s.name === name);

  const handleRunSimulation = () => {
    const speciesParam = simulationList.map(s => `${s.name}:${s.population}`).join(',');
    navigate(`/simulator?location=${encodeURIComponent(activeLocation?.name ?? '')}&species=${encodeURIComponent(speciesParam)}`);
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Ecosystem background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${region.gradient} opacity-20 pointer-events-none`} />

      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => {
          const particles = region.particleType === 'snow' || region.particleType === 'ice'
            ? ['❄', '✦', '·', '◇']
            : region.particleType === 'sand' ? ['·', '∘', '∙']
            : region.particleType === 'water' ? ['~', '≈', '·']
            : ['🍃', '🌿', '·'];
          return (
            <motion.span
              key={i}
              className="absolute text-foreground/10 select-none"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, fontSize: `${10 + Math.random() * 14}px` }}
              animate={{ y: [0, -30, 0], x: [0, Math.random() * 15 - 7, 0], opacity: [0.05, 0.25, 0.05] }}
              transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: i * 0.4, ease: 'easeInOut' }}
            >
              {particles[i % particles.length]}
            </motion.span>
          );
        })}
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-border/20 bg-card/20 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="w-9 h-9 rounded-full bg-secondary/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-display">{region.subtitle}</p>
            <h1 className="text-xl font-bold font-display text-foreground">{region.name}</h1>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8">
        {/* Location tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {region.locations.map(loc => (
            <button
              key={loc.id}
              onClick={() => setSelectedLocation(loc.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-display transition-all ${
                activeLocation?.id === loc.id
                  ? 'bg-primary/20 text-primary border border-primary/30'
                  : 'bg-secondary/50 text-muted-foreground border border-border/30 hover:text-foreground hover:border-border'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              {loc.name}
            </button>
          ))}
        </div>

        {activeLocation && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLocation.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Existing ecosystem */}
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <h2 className="text-lg font-display font-semibold text-foreground">Current Ecosystem</h2>
                  <span className="text-xs text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-full">
                    {activeLocation.existingSpecies.length} species
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {activeLocation.existingSpecies.map((sp, i) => (
                    <ExistingSpeciesCard
                      key={sp.id}
                      species={sp}
                      index={i}
                      inSim={isInSim(sp.name)}
                      onRemove={() => removeFromSim(sp.name)}
                      onAdd={() => setSimulationList(prev => [...prev, { name: sp.name, population: sp.population, isExtinct: false }])}
                    />
                  ))}
                </div>
              </section>

              {/* Extinct species for reintroduction */}
              <section className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: region.accentColor }} />
                  <h2 className="text-lg font-display font-semibold text-foreground">Extinct Species — Reintroduction Candidates</h2>
                  <span className="text-xs text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-full">
                    {activeLocation.extinctSpecies.length} species
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {activeLocation.extinctSpecies.map((sp, i) => (
                    <SpeciesCard
                      key={sp.id}
                      species={sp}
                      index={i}
                      onClick={() => setSelectedSpecies(sp)}
                      inSim={isInSim(sp.name)}
                      onToggleSim={() => isInSim(sp.name) ? removeFromSim(sp.name) : addExtinctToSim(sp)}
                    />
                  ))}
                </div>
              </section>

              {/* Simulation panel */}
              <section className="panel border-primary/20 mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-display font-semibold text-foreground text-base">Ecosystem Simulation</h3>
                    <p className="text-xs text-muted-foreground">
                      {simulationList.length} species loaded · {simulationList.filter(s => s.isExtinct).length} reintroduced
                    </p>
                  </div>
                  <Button
                    onClick={handleRunSimulation}
                    disabled={simulationList.length === 0}
                    className="gap-2 font-display"
                  >
                    <Play className="w-4 h-4" /> Run Simulation
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {simulationList.map(sp => (
                    <span
                      key={sp.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-display ${
                        sp.isExtinct
                          ? 'bg-accent/15 text-accent border border-accent/30'
                          : 'bg-primary/10 text-primary border border-primary/20'
                      }`}
                    >
                      {sp.name}
                      <span className="text-muted-foreground">({sp.population})</span>
                      <button
                        onClick={() => removeFromSim(sp.name)}
                        className="ml-1 hover:text-destructive transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </section>

              {/* Data source */}
              <p className="text-[10px] text-muted-foreground/30 font-display">
                Data derived from IUCN Red List, GBIF, and ecological research databases
              </p>
            </motion.div>
          </AnimatePresence>
        )}
      </main>

      {/* Species Modal */}
      <SpeciesModal
        species={selectedSpecies}
        regionId={region.id}
        locationName={activeLocation?.name ?? ''}
        onClose={() => setSelectedSpecies(null)}
        onAddToSim={(sp) => addExtinctToSim(sp)}
        inSim={selectedSpecies ? isInSim(selectedSpecies.name) : false}
      />
    </div>
  );
};

function ExistingSpeciesCard({
  species,
  index,
  inSim,
  onRemove,
  onAdd,
}: {
  species: ExistingSpecies;
  index: number;
  inSim: boolean;
  onRemove: () => void;
  onAdd: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group rounded-xl border border-border/40 bg-card/60 backdrop-blur-md p-4 flex items-start gap-3"
    >
      <span className="text-3xl select-none">{species.image}</span>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-foreground truncate">{species.name}</h4>
        <p className="text-[10px] text-muted-foreground italic truncate">{species.scientificName}</p>
        <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">{species.notes}</p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-[10px] text-primary bg-primary/10 px-1.5 py-0.5 rounded font-display">
            Pop: {species.population.toLocaleString()}
          </span>
          <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded capitalize font-display">
            {species.type}
          </span>
        </div>
      </div>
      <button
        onClick={inSim ? onRemove : onAdd}
        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
          inSim
            ? 'bg-destructive/15 text-destructive hover:bg-destructive/25'
            : 'bg-primary/10 text-primary hover:bg-primary/20'
        }`}
        title={inSim ? 'Remove from simulation' : 'Add to simulation'}
      >
        {inSim ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
      </button>
    </motion.div>
  );
}

export default RegionExperience;
