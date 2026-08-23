import { motion, AnimatePresence } from 'framer-motion';
import { X, FlaskConical, TreePine, Dna, Leaf, Clock, Skull, ArrowRight, Plus, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ExtinctSpecies } from '@/lib/regionsData';
import { ViabilityIndicator } from './ViabilityIndicator';
import { Button } from './ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

interface SpeciesModalProps {
  species: ExtinctSpecies | null;
  regionId: string;
  locationName: string;
  onClose: () => void;
  onAddToSim?: (sp: ExtinctSpecies) => void;
  inSim?: boolean;
}

export const SpeciesModal = ({ species, regionId, locationName, onClose, onAddToSim, inSim }: SpeciesModalProps) => {
  const navigate = useNavigate();

  const handleRunSimulation = () => {
    navigate(`/simulator?location=${encodeURIComponent(locationName)}&species=${encodeURIComponent(species?.name ?? '')}`);
  };

  return (
    <AnimatePresence>
      {species && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 60 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-lg overflow-y-auto border-l border-border bg-card"
          >
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-5xl mb-3 block">{species.image}</span>
                  <h2 className="text-2xl font-bold font-display text-foreground">{species.name}</h2>
                  <p className="text-sm text-muted-foreground italic">{species.scientificName}</p>
                  <p className="text-[10px] text-muted-foreground capitalize bg-secondary/60 inline-block px-2 py-0.5 rounded mt-2 font-display">
                    {species.type} · Trophic Level {species.trophicLevel}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Viability */}
              <div className="panel">
                <ViabilityIndicator score={species.viability.overall} showBreakdown breakdown={species.viability} />
              </div>

              {/* Info sections */}
              <div className="space-y-4">
                {[
                  { icon: Clock, label: 'Period', text: species.period },
                  { icon: Skull, label: 'Extinction Cause', text: species.extinctionCause },
                  { icon: TreePine, label: 'Original Habitat', text: species.habitat },
                  { icon: Dna, label: 'Evolution Lineage', text: species.evolvedFrom },
                  { icon: Leaf, label: 'Ecological Role', text: species.ecologicalRole },
                  { icon: FlaskConical, label: 'Reintroduction Benefit', text: species.reintroductionBenefit },
                ].map(({ icon: Icon, label, text }) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs font-display uppercase tracking-wider text-muted-foreground mb-0.5">{label}</p>
                      <p className="text-sm text-foreground/80 leading-relaxed">{text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Data source tooltip */}
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-[10px] text-muted-foreground/60 cursor-help underline underline-offset-2 decoration-dotted">
                      Data sources
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-xs text-xs">
                    Data derived from bioscience datasets (e.g., Colossal Biosciences, IUCN Red List, GBIF ecological databases)
                  </TooltipContent>
                </Tooltip>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                {onAddToSim && (
                  <Button
                    onClick={() => onAddToSim(species)}
                    variant={inSim ? 'secondary' : 'outline'}
                    disabled={inSim}
                    className="w-full gap-2 font-display"
                  >
                    {inSim ? <><Check className="w-4 h-4" /> Added to Ecosystem</> : <><Plus className="w-4 h-4" /> Add to Ecosystem Simulation</>}
                  </Button>
                )}
                <Button onClick={handleRunSimulation} className="w-full gap-2 h-12 text-base font-display" size="lg">
                  Run Simulation <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
