import { useMemo } from 'react';
import type { SimulationResult } from '@/lib/types';

export function FoodWebGraph({ result }: { result: SimulationResult }) {
  const speciesNames = Object.keys(result.finalPopulations);

  const interactions = useMemo(() => {
    // Deduplicate
    const seen = new Set<string>();
    return result.trophicInteractions.filter(i => {
      const key = `${i.source}-${i.target}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [result.trophicInteractions]);

  // Position species in a circle
  const cx = 140, cy = 120, radius = 80;
  const positions = speciesNames.map((name, i) => {
    const angle = (i / speciesNames.length) * Math.PI * 2 - Math.PI / 2;
    return { name, x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  });

  const getPos = (name: string) => positions.find(p => p.name === name) || { x: cx, y: cy };

  const typeColors: Record<string, string> = {
    predation: 'hsl(0, 72%, 55%)',
    competition: 'hsl(38, 92%, 55%)',
    mutualism: 'hsl(145, 65%, 45%)',
  };

  return (
    <div className="panel">
      <h3 className="data-label mb-3">Food Web Interactions</h3>
      <svg viewBox="0 0 280 240" className="w-full">
        {/* Interaction lines */}
        {interactions.map((inter, i) => {
          const from = getPos(inter.source);
          const to = getPos(inter.target);
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={typeColors[inter.type] || 'hsl(215, 15%, 55%)'}
              strokeWidth={1 + inter.strength * 300}
              strokeOpacity={0.5}
              strokeDasharray={inter.type === 'competition' ? '4 2' : undefined}
            />
          );
        })}

        {/* Species nodes */}
        {positions.map(pos => {
          const pop = result.finalPopulations[pos.name] ?? 0;
          const nodeRadius = Math.max(8, Math.min(20, Math.log10(pop + 1) * 5));
          const survival = result.survivalProbabilities[pos.name] ?? 0;
          const fill = survival > 0.7
            ? 'hsl(145, 65%, 45%)'
            : survival > 0.4
            ? 'hsl(38, 92%, 55%)'
            : 'hsl(0, 72%, 55%)';

          return (
            <g key={pos.name}>
              <circle cx={pos.x} cy={pos.y} r={nodeRadius + 2} fill={fill} opacity={0.2} />
              <circle cx={pos.x} cy={pos.y} r={nodeRadius} fill={fill} opacity={0.8} />
              <text
                x={pos.x}
                y={pos.y + nodeRadius + 12}
                textAnchor="middle"
                fill="hsl(200, 20%, 90%)"
                fontSize="8"
                fontFamily="Inter, sans-serif"
              >
                {pos.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex gap-3 mt-2 justify-center">
        {[
          { label: 'Predation', color: typeColors.predation, dash: false },
          { label: 'Competition', color: typeColors.competition, dash: true },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-1.5">
            <svg width="16" height="8">
              <line
                x1="0" y1="4" x2="16" y2="4"
                stroke={item.color}
                strokeWidth="2"
                strokeDasharray={item.dash ? '4 2' : undefined}
              />
            </svg>
            <span className="text-xs text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
