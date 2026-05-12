import { AlertTriangle, CheckCircle, Clock, Dna, Users, ArrowRight } from 'lucide-react';
import type { Recommendation } from '@/lib/types';

const icons: Record<string, typeof CheckCircle> = {
  population: Users,
  timing: Clock,
  genetic: Dna,
  delay: AlertTriangle,
  proceed: CheckCircle,
};

const priorityStyles: Record<string, string> = {
  high: 'border-l-danger bg-danger/5',
  medium: 'border-l-accent bg-accent/5',
  low: 'border-l-success bg-success/5',
};

const priorityBadge: Record<string, string> = {
  high: 'bg-danger/20 text-danger',
  medium: 'bg-accent/20 text-accent',
  low: 'bg-success/20 text-success',
};

export function RecommendationsPanel({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <div className="panel">
      <h3 className="data-label mb-3 flex items-center gap-2">
        <ArrowRight className="w-4 h-4" /> Recommendations
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {recommendations.map((rec, i) => {
          const Icon = icons[rec.type] || CheckCircle;
          return (
            <div key={i} className={`border-l-2 rounded-r-md p-3 ${priorityStyles[rec.priority]}`}>
              <div className="flex items-start gap-2">
                <Icon className="w-4 h-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-foreground">{rec.title}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-display uppercase ${priorityBadge[rec.priority]}`}>
                      {rec.priority}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">{rec.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
