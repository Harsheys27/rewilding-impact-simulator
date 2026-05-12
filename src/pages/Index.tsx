import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Zap, FlaskConical, BarChart3, Shield } from 'lucide-react';
import { SimulationControls } from '@/components/SimulationControls';
import { PopulationChart } from '@/components/PopulationChart';
import { FoodWebGraph } from '@/components/FoodWebGraph';
import { EcosystemHealthPanel } from '@/components/EcosystemHealthPanel';
import { RecommendationsPanel } from '@/components/RecommendationsPanel';
import { UncertaintyDisplay } from '@/components/UncertaintyDisplay';
import { ValidationModule } from '@/components/ValidationModule';
import { PipelineViewer } from '@/components/PipelineViewer';
import { StatusBar } from '@/components/StatusBar';
import type { SimulationResult, SimulationConfig } from '@/lib/types';
import { runSimulation } from '@/lib/simulationEngine';

const Index = () => {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [activeTab, setActiveTab] = useState<'simulation' | 'validation' | 'pipeline'>('simulation');
  const [config, setConfig] = useState<SimulationConfig | null>(null);

  const handleRunSimulation = useCallback((simConfig: SimulationConfig) => {
    setIsRunning(true);
    setConfig(simConfig);
    // Use setTimeout to allow UI to update
    setTimeout(() => {
      const res = runSimulation(
        simConfig.species,
        simConfig.climate,
        simConfig.years,
        simConfig.monteCarloRuns
      );
      setResult(res);
      setIsRunning(false);
    }, 500);
  }, []);

  const tabs = [
    { id: 'simulation' as const, label: 'Simulation', icon: Activity },
    { id: 'validation' as const, label: 'Validation', icon: Shield },
    { id: 'pipeline' as const, label: 'Data Pipeline', icon: FlaskConical },
  ];

  return (
    <div className="min-h-screen bg-background scanline">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
<div className="w-10 h-10 rounded bg-primary/20 flex items-center justify-center">
              <img src="/logo.png" alt="logo" className="w-10 h-10 object-contain" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">Rewilding Impact Simulator</h1>
              <p className="text-xs text-muted-foreground">Agent-Based Ecosystem Modeling Platform</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm font-medium transition-colors font-display ${
                  activeTab === tab.id
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'simulation' && (
            <motion.div
              key="simulation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="grid grid-cols-12 gap-4">
                {/* Left: Controls */}
                <div className="col-span-12 lg:col-span-3">
                  <SimulationControls onRun={handleRunSimulation} isRunning={isRunning} />
                </div>

                {/* Right: Results */}
                <div className="col-span-12 lg:col-span-9 space-y-4">
                  {!result && !isRunning && (
                    <div className="panel grid-pattern flex flex-col items-center justify-center min-h-[400px] text-center">
                      <Zap className="w-12 h-12 text-muted-foreground mb-4" />
                      <h2 className="text-xl font-display text-foreground mb-2">Configure & Run Simulation</h2>
                      <p className="text-muted-foreground max-w-md">
                        Select species, location, and climate scenario, then click "Run Simulation" to generate predictions.
                      </p>
                    </div>
                  )}

                  {isRunning && (
                    <div className="panel flex flex-col items-center justify-center min-h-[400px]">
                      <div className="w-16 h-16 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4" />
                      <p className="text-primary font-display">Running Monte Carlo simulations...</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {config?.monteCarloRuns ?? 50} iterations × {config?.years ?? 30} years
                      </p>
                    </div>
                  )}

                  {result && !isRunning && (
                    <>
                      <StatusBar result={result} config={config} />

                      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                        <PopulationChart result={result} />
                        <UncertaintyDisplay result={result} />
                      </div>

                      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                        <EcosystemHealthPanel result={result} />
                        <FoodWebGraph result={result} />
                        <div className="flex flex-col gap-4">
                          <div className="panel">
                            <h3 className="data-label mb-2 flex items-center gap-2">
                              <BarChart3 className="w-4 h-4" /> Survival Probabilities
                            </h3>
                            <div className="space-y-2">
                              {Object.entries(result.survivalProbabilities).map(([sp, prob]) => (
                                <div key={sp}>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span className="text-foreground">{sp}</span>
                                    <span className={prob > 0.7 ? 'text-success' : prob > 0.4 ? 'text-accent' : 'text-danger'}>
                                      {(prob * 100).toFixed(0)}%
                                    </span>
                                  </div>
                                  <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full transition-all ${
                                        prob > 0.7 ? 'bg-success' : prob > 0.4 ? 'bg-accent' : 'bg-danger'
                                      }`}
                                      style={{ width: `${prob * 100}%` }}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <RecommendationsPanel recommendations={result.recommendations} />
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'validation' && (
            <motion.div
              key="validation"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ValidationModule />
            </motion.div>
          )}

          {activeTab === 'pipeline' && (
            <motion.div
              key="pipeline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <PipelineViewer />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Index;
