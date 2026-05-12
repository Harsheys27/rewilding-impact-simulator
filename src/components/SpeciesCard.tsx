import { motion } from 'framer-motion';
import { Plus, Check } from 'lucide-react';
import type { ExtinctSpecies } from '@/lib/regionsData';
import { ViabilityIndicator } from './ViabilityIndicator';

interface SpeciesCardProps {
  species: ExtinctSpecies;
  index: number;
  onClick: () => void;
  inSim?: boolean;
  onToggleSim?: () => void;
}

export const SpeciesCard = ({ species, index, onClick, inSim, onToggleSim }: SpeciesCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group relative cursor-pointer rounded-xl border border-border/40 bg-card/60 backdrop-blur-md p-5 transition-colors hover:border-primary/30"
    >
      <div onClick={onClick}>
        {/* Floating emoji */}
        <motion.div
          className="text-5xl mb-4 select-none"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
        >
          {species.image}
        </motion.div>

        <h3 className="text-lg font-semibold text-foreground font-display mb-0.5">{species.name}</h3>
        <p className="text-xs text-muted-foreground italic mb-1">{species.scientificName}</p>
        <p className="text-[10px] text-muted-foreground capitalize bg-secondary/60 inline-block px-2 py-0.5 rounded mb-3 font-display">
          {species.type} · Trophic {species.trophicLevel}
        </p>
        <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{species.period}</p>

        <ViabilityIndicator score={species.viability.overall} compact />
      </div>

      {/* Add to sim button */}
      {onToggleSim && (
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSim(); }}
          className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            inSim
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary/80 text-muted-foreground hover:bg-primary/20 hover:text-primary opacity-0 group-hover:opacity-100'
          }`}
          title={inSim ? 'Added to simulation' : 'Add to simulation'}
        >
          {inSim ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </button>
      )}

      {/* Click hint */}
      <div className="absolute bottom-4 right-4 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
        Details →
      </div>
    </motion.div>
  );
};
