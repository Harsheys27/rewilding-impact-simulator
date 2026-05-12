import { viabilityLevel } from '@/lib/regionsData';

interface ViabilityIndicatorProps {
  score: number;
  compact?: boolean;
  showBreakdown?: boolean;
  breakdown?: {
    dnaAvailability: number;
    environmentalCompatibility: number;
    geneticSimilarity: number;
  };
}

export const ViabilityIndicator = ({ score, compact, showBreakdown, breakdown }: ViabilityIndicatorProps) => {
  const level = viabilityLevel(score);
  const pct = Math.round(score * 100);

  const colorClass =
    level === 'High' ? 'bg-success text-success' :
    level === 'Medium' ? 'bg-accent text-accent' :
    'bg-danger text-danger';

  const barBg =
    level === 'High' ? 'bg-success' :
    level === 'Medium' ? 'bg-accent' :
    'bg-danger';

  const labelColor =
    level === 'High' ? 'text-success' :
    level === 'Medium' ? 'text-accent' :
    'text-danger';

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
          <div className={`h-full rounded-full ${barBg} transition-all duration-700`} style={{ width: `${pct}%` }} />
        </div>
        <span className={`text-xs font-display font-medium ${labelColor}`}>
          {pct}%
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-display text-muted-foreground">Reintroduction Viability</span>
        <span className={`text-sm font-bold font-display ${labelColor}`}>
          {level} — {pct}%
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-secondary overflow-hidden">
        <div className={`h-full rounded-full ${barBg} transition-all duration-1000`} style={{ width: `${pct}%` }} />
      </div>

      {showBreakdown && breakdown && (
        <div className="grid grid-cols-3 gap-3 pt-2">
          {[
            { label: 'DNA Availability', value: breakdown.dnaAvailability },
            { label: 'Env. Compatibility', value: breakdown.environmentalCompatibility },
            { label: 'Genetic Similarity', value: breakdown.geneticSimilarity },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-lg font-bold font-display text-foreground">
                {Math.round(item.value * 100)}%
              </div>
              <div className="text-[10px] text-muted-foreground leading-tight">{item.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
