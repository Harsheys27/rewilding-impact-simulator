import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Shield, Play } from 'lucide-react';
import { VALIDATION_SCENARIOS, getValidationConfig } from '@/lib/validationScenarios';
import { runSimulation } from '@/lib/simulationEngine';
import type { SimulationResult } from '@/lib/types';

const COLORS_SIM = ['hsl(175, 80%, 48%)', 'hsl(145, 65%, 45%)', 'hsl(38, 92%, 55%)'];
const COLORS_KNOWN = ['hsl(175, 80%, 48%)', 'hsl(145, 65%, 45%)', 'hsl(38, 92%, 55%)'];

export function ValidationModule() {
  const [selectedScenario] = useState(0);
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const scenario = VALIDATION_SCENARIOS[selectedScenario];

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      const config = getValidationConfig(scenario);
      const res = runSimulation(config.species, config.climate, config.years, config.monteCarloRuns);
      setResult(res);
      setIsRunning(false);
    }, 500);
  };

  // Build comparison data
  const comparisonData = scenario.knownOutcome[0]?.data.map((_, i) => {
    const point: Record<string, number> = { year: i };
    for (const known of scenario.knownOutcome) {
      point[`${known.species} (Known)`] = known.data[i] ?? 0;
    }
    if (result) {
      for (const known of scenario.knownOutcome) {
        point[`${known.species} (Simulated)`] = result.steps[i]?.populations[known.species] ?? 0;
      }
    }
    return point;
  }) ?? [];

  return (
    <div className="max-w-5xl mx-auto space-y-4">
      <div className="panel">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary mt-1" />
          <div className="flex-1">
            <h2 className="text-lg font-display text-foreground mb-1">{scenario.name}</h2>
            <p className="text-sm text-muted-foreground mb-3">{scenario.description}</p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground font-display">{scenario.year}</span>
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{scenario.location}</span>
            </div>
          </div>
          <Button onClick={handleRun} disabled={isRunning} className="bg-primary text-primary-foreground font-display">
            {isRunning ? 'Running...' : <><Play className="w-4 h-4 mr-1" /> Validate</>}
          </Button>
        </div>
      </div>

      {/* Known Outcome */}
      <div className="panel">
        <h3 className="data-label mb-3">
          {result ? 'Simulated vs Known Outcomes' : 'Known Historical Outcomes'}
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={comparisonData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 18%, 18%)" />
            <XAxis dataKey="year" stroke="hsl(215, 15%, 55%)" tick={{ fontSize: 11 }} label={{ value: 'Year', position: 'insideBottom', offset: -3, fill: 'hsl(215, 15%, 55%)' }} />
            <YAxis stroke="hsl(215, 15%, 55%)" tick={{ fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(220, 22%, 10%)',
                border: '1px solid hsl(220, 18%, 18%)',
                borderRadius: '6px',
                fontSize: '11px',
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px' }} />
            {scenario.knownOutcome.map((known, i) => (
              <Line
                key={`known-${known.species}`}
                type="monotone"
                dataKey={`${known.species} (Known)`}
                stroke={COLORS_KNOWN[i]}
                strokeWidth={2}
                dot={false}
              />
            ))}
            {result && scenario.knownOutcome.map((known, i) => (
              <Line
                key={`sim-${known.species}`}
                type="monotone"
                dataKey={`${known.species} (Simulated)`}
                stroke={COLORS_SIM[i]}
                strokeWidth={2}
                strokeDasharray="5 3"
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
        {result && (
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Solid lines = historical data · Dashed lines = simulation output
          </p>
        )}
      </div>

      {result && (
        <div className="panel">
          <h3 className="data-label mb-3">Validation Metrics</h3>
          <div className="grid grid-cols-3 gap-4">
            {scenario.knownOutcome.map(known => {
              const simFinal = result.finalPopulations[known.species] ?? 0;
              const knownFinal = known.data[known.data.length - 1] ?? 0;
              const error = knownFinal > 0 ? Math.abs(simFinal - knownFinal) / knownFinal * 100 : 0;
              return (
                <div key={known.species} className="bg-secondary rounded-md p-3">
                  <p className="text-xs text-muted-foreground mb-1">{known.species}</p>
                  <p className="data-value-sm">{error.toFixed(1)}% error</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Sim: {Math.round(simFinal)} · Known: {knownFinal}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
