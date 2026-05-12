import { Activity, Thermometer, Bug, Layers } from 'lucide-react';
import type { SimulationResult, SimulationConfig } from '@/lib/types';

export function StatusBar({ result, config }: { result: SimulationResult; config: SimulationConfig | null }) {
  const lastStep = result.steps[result.steps.length - 1];
  const aliveSpecies = Object.values(result.finalPopulations).filter(p => p > 10).length;
  const totalSpecies = Object.keys(result.finalPopulations).length;

  const metrics = [
    {
      icon: Activity,
      label: 'Ecosystem Stability',
      value: `${(result.ecosystemStability * 100).toFixed(0)}%`,
      color: result.ecosystemStability > 0.6 ? 'text-success' : 'text-accent',
    },
    {
      icon: Layers,
      label: 'Species Surviving',
      value: `${aliveSpecies}/${totalSpecies}`,
      color: aliveSpecies === totalSpecies ? 'text-success' : 'text-accent',
    },
    {
      icon: Thermometer,
      label: 'Final Temperature',
      value: `${lastStep?.temperature.toFixed(1)}°C`,
      color: 'text-info',
    },
    {
      icon: Bug,
      label: 'Climate Scenario',
      value: config?.climate.scenario === 'rcp85' ? 'RCP 8.5' : config?.climate.scenario === 'rcp45' ? 'RCP 4.5' : 'Current',
      color: config?.climate.scenario === 'rcp85' ? 'text-danger' : 'text-foreground',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {metrics.map(m => (
        <div key={m.label} className="panel flex items-center gap-3">
          <m.icon className="w-5 h-5 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground">{m.label}</p>
            <p className={`data-value-sm ${m.color}`}>{m.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
