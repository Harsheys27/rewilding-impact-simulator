import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import type { Region } from '@/lib/regionsData';
import { getRegionSpeciesCount } from '@/lib/regionsData';

const particleElements: Record<string, string[]> = {
  sand: ['·', '∘', '⋅', '∙'],
  leaves: ['🍃', '🌿', '🍂'],
  snow: ['❄', '❆', '✦', '·'],
  ice: ['❄', '◇', '✧', '△'],
  water: ['~', '≈', '∽', '·'],
  pine: ['🌲', '🍂', '🌿', '·'],
};

export const RegionCard = ({ region, index }: { region: Region; index: number }) => {
  const navigate = useNavigate();
  const particles = particleElements[region.particleType] || particleElements.leaves;
  const counts = getRegionSpeciesCount(region);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={() => navigate(`/region/${region.id}`)}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
      style={{ minHeight: '300px' }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${region.gradient} transition-opacity duration-500 opacity-60 group-hover:opacity-80`} />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute text-foreground/20 select-none"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              fontSize: `${12 + Math.random() * 14}px`,
            }}
            animate={{ y: [0, -20, 0], x: [0, Math.random() * 10 - 5, 0], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
          >
            {particles[i % particles.length]}
          </motion.span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6">
        <div className="mt-auto">
          <p className="text-xs uppercase tracking-widest text-foreground/50 font-display mb-1">{region.subtitle}</p>
          <h2 className="text-2xl font-bold text-foreground font-display mb-2">{region.name}</h2>
          <p className="text-sm text-foreground/60 leading-relaxed mb-4 max-w-xs">{region.description}</p>
          <div className="flex items-center gap-4 text-xs text-foreground/40">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />
              {region.locations.length} locations
            </span>
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: region.accentColor }} />
              {counts.existing} existing · {counts.extinct} extinct
            </span>
          </div>
        </div>

        {/* Hover arrow */}
        <div className="absolute top-6 right-6 w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-foreground">→</span>
        </div>
      </div>
    </motion.div>
  );
};
