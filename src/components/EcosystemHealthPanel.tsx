import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { SimulationResult } from '@/lib/types';

export function EcosystemHealthPanel({ result }: { result: SimulationResult }) {
  const data = result.steps.map(s => ({
    year: s.year,
    health: Math.round(s.ecosystemHealth * 100),
    temp: s.temperature.toFixed(1),
  }));

  const finalHealth = result.ecosystemStability;
  const healthLabel = finalHealth > 0.7 ? 'Healthy' : finalHealth > 0.4 ? 'At Risk' : 'Critical';
  const healthColor = finalHealth > 0.7 ? 'text-success' : finalHealth > 0.4 ? 'text-accent' : 'text-danger';

  return (
    <div className="panel">
      <h3 className="data-label mb-2">Ecosystem Health</h3>
      <div className="flex items-baseline gap-2 mb-3">
        <span className="data-value">{(finalHealth * 100).toFixed(0)}%</span>
        <span className={`text-sm font-display ${healthColor}`}>{healthLabel}</span>
      </div>
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 18%, 18%)" />
          <XAxis dataKey="year" stroke="hsl(215, 15%, 55%)" tick={{ fontSize: 10 }} />
          <YAxis domain={[0, 100]} stroke="hsl(215, 15%, 55%)" tick={{ fontSize: 10 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(220, 22%, 10%)',
              border: '1px solid hsl(220, 18%, 18%)',
              borderRadius: '6px',
              fontSize: '11px',
            }}
          />
          <Line type="monotone" dataKey="health" stroke="hsl(145, 65%, 45%)" strokeWidth={2} dot={false} name="Health %" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
