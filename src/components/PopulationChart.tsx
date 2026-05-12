import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { SimulationResult } from '@/lib/types';

const COLORS = [
  'hsl(175, 80%, 48%)',
  'hsl(0, 72%, 55%)',
  'hsl(145, 65%, 45%)',
  'hsl(38, 92%, 55%)',
  'hsl(210, 80%, 55%)',
  'hsl(280, 70%, 55%)',
  'hsl(30, 80%, 50%)',
  'hsl(330, 70%, 55%)',
];

export function PopulationChart({ result }: { result: SimulationResult }) {
  const speciesNames = Object.keys(result.steps[0]?.populations ?? {});

  const data = result.steps.map(step => ({
    year: step.year,
    ...step.populations,
  }));

  return (
    <div className="panel">
      <h3 className="data-label mb-3">Population Dynamics Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 18%, 18%)" />
          <XAxis dataKey="year" stroke="hsl(215, 15%, 55%)" tick={{ fontSize: 11 }} label={{ value: 'Year', position: 'insideBottom', offset: -3, fill: 'hsl(215, 15%, 55%)' }} />
          <YAxis stroke="hsl(215, 15%, 55%)" tick={{ fontSize: 11 }} label={{ value: 'Population', angle: -90, position: 'insideLeft', fill: 'hsl(215, 15%, 55%)' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'hsl(220, 22%, 10%)',
              border: '1px solid hsl(220, 18%, 18%)',
              borderRadius: '6px',
              fontSize: '12px',
            }}
          />
          <Legend wrapperStyle={{ fontSize: '12px' }} />
          {speciesNames.map((name, i) => (
            <Line
              key={name}
              type="monotone"
              dataKey={name}
              stroke={COLORS[i % COLORS.length]}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
