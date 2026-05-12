import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Play, Plus, X, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { getAvailableSpecies, getAvailableLocations, getLocationData, createSpeciesAgent } from '@/lib/dataPipeline';
import type { SimulationConfig, ClimateScenario } from '@/lib/types';

interface Props {
  onRun: (config: SimulationConfig) => void;
  isRunning: boolean;
}

interface SpeciesEntry {
  name: string;
  population: number;
}

export function SimulationControls({ onRun, isRunning }: Props) {
  const [searchParams] = useSearchParams();

  // Parse URL params for pre-loaded species
  const urlLocation = searchParams.get('location') || '';
  const urlSpecies = searchParams.get('species') || '';

  const parseUrlSpecies = (): SpeciesEntry[] => {
    if (!urlSpecies) return [{ name: 'Gray Wolf', population: 30 }, { name: 'Elk', population: 8000 }];
    // Support format: "Name:pop,Name:pop" or just "Name"
    return urlSpecies.split(',').map(entry => {
      const [name, popStr] = entry.split(':');
      return { name: name.trim(), population: parseInt(popStr) || 50 };
    }).filter(e => e.name);
  };

  const getInitialLocation = (): string => {
    if (urlLocation) {
      const available = getAvailableLocations();
      if (available.includes(urlLocation)) return urlLocation;
    }
    return 'Yellowstone, USA';
  };

  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesEntry[]>(parseUrlSpecies);
  const [location, setLocation] = useState(getInitialLocation);
  const [climateScenario, setClimateScenario] = useState<ClimateScenario>('current');
  const [years, setYears] = useState(30);
  const [monteCarloRuns, setMonteCarloRuns] = useState(50);
  const [useGeneticOptimization, setUseGeneticOptimization] = useState(false);
  const [addingSpecies, setAddingSpecies] = useState(false);

  const availableSpecies = getAvailableSpecies().filter(s => !selectedSpecies.find(ss => ss.name === s));

  const handleRun = () => {
    const locData = getLocationData(location);
    const climateParams = {
      current: { scenario: 'current' as const, baseTemp: locData.baseTemp, tempChangePerYear: 0.02, precipitationChange: 1.0, extremeEventFrequency: 2 },
      rcp45: { scenario: 'rcp45' as const, baseTemp: locData.baseTemp, tempChangePerYear: 0.04, precipitationChange: 0.95, extremeEventFrequency: 4 },
      rcp85: { scenario: 'rcp85' as const, baseTemp: locData.baseTemp, tempChangePerYear: 0.08, precipitationChange: 0.85, extremeEventFrequency: 8 },
    };

    const agents = selectedSpecies
      .map(s => createSpeciesAgent(s.name, s.population, useGeneticOptimization))
      .filter(Boolean) as NonNullable<ReturnType<typeof createSpeciesAgent>>[];

    onRun({
      species: agents,
      climate: climateParams[climateScenario],
      years,
      location,
      monteCarloRuns,
      useGeneticOptimization,
    });
  };

  return (
    <div className="panel space-y-4">
      <h2 className="data-label flex items-center gap-2">
        <Settings2 className="w-4 h-4" /> Simulation Parameters
      </h2>

      {/* Location */}
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Location</label>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {getAvailableLocations().map(loc => (
              <SelectItem key={loc} value={loc}>{loc}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Climate Scenario */}
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Climate Scenario</label>
        <Select value={climateScenario} onValueChange={(v) => setClimateScenario(v as ClimateScenario)}>
          <SelectTrigger className="bg-secondary border-border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="current">Current Climate</SelectItem>
            <SelectItem value="rcp45">RCP 4.5 (Moderate)</SelectItem>
            <SelectItem value="rcp85">RCP 8.5 (Severe)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Species */}
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Species ({selectedSpecies.length})</label>
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          {selectedSpecies.map((sp, i) => (
            <div key={sp.name} className="bg-secondary rounded-md p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-foreground truncate">{sp.name}</span>
                <button
                  onClick={() => setSelectedSpecies(prev => prev.filter((_, idx) => idx !== i))}
                  className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-8">Pop:</span>
                <input
                  type="number"
                  value={sp.population}
                  onChange={(e) => {
                    const val = parseInt(e.target.value) || 0;
                    setSelectedSpecies(prev => prev.map((s, idx) => idx === i ? { ...s, population: val } : s));
                  }}
                  className="flex-1 bg-muted border border-border rounded px-2 py-1 text-xs text-foreground"
                />
              </div>
            </div>
          ))}

          {addingSpecies && availableSpecies.length > 0 ? (
            <Select onValueChange={(v) => { setSelectedSpecies(prev => [...prev, { name: v, population: 50 }]); setAddingSpecies(false); }}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue placeholder="Select species..." />
              </SelectTrigger>
              <SelectContent>
                {availableSpecies.map(s => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <button
              onClick={() => setAddingSpecies(true)}
              className="w-full flex items-center justify-center gap-1 py-1.5 border border-dashed border-border rounded text-xs text-muted-foreground hover:text-primary hover:border-primary transition-colors"
              disabled={availableSpecies.length === 0}
            >
              <Plus className="w-3 h-3" /> Add Species
            </button>
          )}
        </div>
      </div>

      {/* Simulation Years */}
      <div>
        <div className="flex justify-between mb-1">
          <label className="text-xs text-muted-foreground">Simulation Duration</label>
          <span className="text-xs text-primary font-display">{years} years</span>
        </div>
        <Slider value={[years]} onValueChange={([v]) => setYears(v)} min={10} max={100} step={5} />
      </div>

      {/* Monte Carlo Runs */}
      <div>
        <div className="flex justify-between mb-1">
          <label className="text-xs text-muted-foreground">Monte Carlo Runs</label>
          <span className="text-xs text-primary font-display">{monteCarloRuns}</span>
        </div>
        <Slider value={[monteCarloRuns]} onValueChange={([v]) => setMonteCarloRuns(v)} min={10} max={200} step={10} />
      </div>

      {/* Genetic Optimization */}
      <div className="flex items-center justify-between">
        <div>
          <label className="text-xs text-foreground">Genetic Optimization</label>
          <p className="text-xs text-muted-foreground">CRISPR-enhanced fitness</p>
        </div>
        <Switch checked={useGeneticOptimization} onCheckedChange={setUseGeneticOptimization} />
      </div>

      {/* Run Button */}
      <Button
        onClick={handleRun}
        disabled={isRunning || selectedSpecies.length === 0}
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-display"
      >
        {isRunning ? (
          <span className="flex items-center gap-2">
            <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            Simulating...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Play className="w-4 h-4" /> Run Simulation
          </span>
        )}
      </Button>
    </div>
  );
}
