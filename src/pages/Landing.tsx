import { motion } from 'framer-motion';
import { RegionCard } from '@/components/RegionCard';
import { regions } from '@/lib/regionsData';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/30 bg-card/30 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <img src="/logo.png" alt="logo" className="w-10 h-10 object-contain" />
            </div>
            <span className="font-display text-sm font-semibold text-foreground tracking-tight">
              Rewilding Impact Simulator
            </span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 pt-20 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground font-display mb-4">
            Explore · Learn · Simulate
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-foreground mb-4 leading-tight">
            Rewild the Planet
          </h1>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Explore extinct species across Earth's ecosystems. Understand their stories. 
            Run scientific simulations to predict what happens when we bring them back.
          </p>
        </motion.div>
      </section>

      {/* Region Grid */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {regions.map((region, i) => (
            <RegionCard key={region.id} region={region} index={i} />
          ))}
        </div>

        {/* Data attribution */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center text-[11px] text-muted-foreground/40 mt-12 font-display"
        >
          Data derived from bioscience datasets (Colossal Biosciences, IUCN, GBIF, ecological databases)
        </motion.p>
      </section>
    </div>
  );
};

export default Landing;
