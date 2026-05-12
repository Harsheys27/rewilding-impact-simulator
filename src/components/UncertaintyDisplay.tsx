import { useMemo, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { SimulationResult } from '@/lib/types';

export function UncertaintyDisplay({ result }: { result: SimulationResult }) {
  const speciesNames = useMemo(() => {
    const names = new Set(result.uncertaintyBands.map(b => b.species));
    return Array.from(names);
  }, [result.uncertaintyBands]);

  const [selectedSpecies, setSelectedSpecies] = useState(speciesNames[0] ?? '');

  const data = useMemo(() => {
    return result.uncertaintyBands
      .filter(b => b.species === selectedSpecies)
      .map(b => ({
        year: b.year,
        mean: Math.round(b.mean),
        lower5: Math.round(b.lower5),
        upper95: Math.round(b.upper95),
        lower25: Math.round(b.lower25),
        upper75: Math.round(b.upper75),
      }));
  }, [result.uncertaintyBands, selectedSpecies]);

  return (
    <div className="panel">
      <div className="flex items-center justify-between mb-3">
        <h3 className="data-label">Uncertainty Analysis (Monte Carlo)</h3>
        <Select value={selectedSpecies} onValueChange={setSelectedSpecies}>
          <SelectTrigger className="w-[160px] h-7 text-xs bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {speciesNames.map(s => (
              <SelectItem key={s} value={s}>{s}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 18%, 18%)" />
          <XAxis dataKey="year" stroke="hsl(215, 15%, 55%)" tick={{ fontSize: 11 }} />
          <YAxis stroke="hsl(215, 15%, 55%)" tick={{ fontSize: 11 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(220, 22%, 10%)',
              border: '1px solid hsl(220, 18%, 18%)',
              borderRadius: '6px',
              fontSize: '12px',
            }}
          />
          <Area type="monotone" dataKey="upper95" stackId="1" stroke="none" fill="hsl(175, 80%, 48%)" fillOpacity={0.1} name="95th percentile" />
          <Area type="monotone" dataKey="upper75" stackId="2" stroke="none" fill="hsl(175, 80%, 48%)" fillOpacity={0.15} name="75th percentile" />
          <Area type="monotone" dataKey="mean" stackId="3" stroke="hsl(175, 80%, 48%)" fill="hsl(175, 80%, 48%)" fillOpacity={0.3} strokeWidth={2} name="Mean" />
          <Area type="monotone" dataKey="lower25" stackId="4" stroke="none" fill="hsl(175, 80%, 48%)" fillOpacity={0.15} name="25th percentile" />
          <Area type="monotone" dataKey="lower5" stackId="5" stroke="none" fill="hsl(175, 80%, 48%)" fillOpacity={0.1} name="5th percentile" />
        </AreaChart>
      </ResponsiveContainer>
      <p className="text-xs text-muted-foreground mt-2 text-center">
        Shaded regions show 50% and 90% confidence intervals from Monte Carlo simulation
      </p>
    </div>
  );
}
