import { CheckCircle, Database, Cpu, CloudSun, ShieldCheck, ArrowRight } from 'lucide-react';
import { PIPELINE_STAGES } from '@/lib/dataPipeline';
import { motion } from 'framer-motion';

const stageIcons = [Database, Cpu, ArrowRight, CloudSun, ShieldCheck];

export function PipelineViewer() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="panel">
        <h2 className="text-lg font-display text-foreground mb-1">Data Preprocessing Pipeline</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Species traits and environmental data are ingested, transformed, and validated before simulation.
        </p>

        <div className="space-y-4">
          {PIPELINE_STAGES.map((stage, i) => {
            const Icon = stageIcons[i] || Database;
            return (
              <motion.div
                key={stage.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
                className="flex items-start gap-4"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  {i < PIPELINE_STAGES.length - 1 && (
                    <div className="w-0.5 h-8 bg-border mt-1" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-foreground">{stage.name}</h3>
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{stage.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Data Sources */}
      <div className="panel">
        <h3 className="data-label mb-3">Integrated Data Sources</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'IUCN Red List', desc: 'Conservation status, population trends', status: 'Connected' },
            { name: 'GBIF', desc: 'Species occurrence, distribution data', status: 'Connected' },
            { name: 'NASA GISS', desc: 'Global temperature projections', status: 'Connected' },
            { name: 'NOAA Climate', desc: 'Precipitation, extreme events', status: 'Connected' },
          ].map(source => (
            <div key={source.name} className="bg-secondary rounded-md p-3">
              <p className="text-sm font-medium text-foreground">{source.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{source.desc}</p>
              <div className="flex items-center gap-1 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse-glow" />
                <span className="text-xs text-success">{source.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Parameter Mapping */}
      <div className="panel">
        <h3 className="data-label mb-3">Trait → Parameter Mapping</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 text-muted-foreground font-display">Ecological Trait</th>
                <th className="text-left py-2 text-muted-foreground font-display">Simulation Parameter</th>
                <th className="text-left py-2 text-muted-foreground font-display">Transform</th>
              </tr>
            </thead>
            <tbody className="text-foreground">
              {[
                ['Litter size / breeding frequency', 'Birth rate (r)', 'Normalized per year per individual'],
                ['Average lifespan', 'Death rate (μ)', '1 / lifespan with fitness modifier'],
                ['Diet composition', 'Interaction coefficients', 'Lotka-Volterra α matrix'],
                ['Thermal niche breadth', 'Climate survival modifier', 'Gaussian tolerance function'],
                ['Conservation status', 'Initial vulnerability', 'IUCN category → risk weight'],
              ].map(([trait, param, transform]) => (
                <tr key={trait} className="border-b border-border/50">
                  <td className="py-2">{trait}</td>
                  <td className="py-2 text-primary font-display">{param}</td>
                  <td className="py-2 text-muted-foreground">{transform}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
