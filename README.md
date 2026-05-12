Rewilding Impact Simulator

Agent-Based Ecosystem Modeling Platform for predicting rewilding outcomes.

Description
Web application for simulating the ecological impacts of rewilding extinct species into modern ecosystems. Users explore regions and species data, configure agent-based simulations with climate scenarios, and visualize population dynamics, uncertainty, ecosystem health, food webs, and generate reintroduction recommendations.

Features
Region & Species Explorer: Browse biomes (Desert/Semi-Arid, Rainforest/Tropical, Island Ecosystems, Arctic/Tundra, Forest/Temperate, Coastal/Marine) with existing and extinct species data including traits, viability scores (DNA availability, environmental compatibility, genetic similarity), trophic levels, and reintroduction benefits.
Agent-Based Simulations: Monte Carlo simulations (default 50 runs) over configurable years (default 30) modeling Lotka-Volterra dynamics with climate effects (RCP scenarios: current/rcp45/rcp85), genetic fitness, trophic interactions, carrying capacity, Allee effects, stochastic noise, and extreme events.
Visualization:
Population charts over time (Recharts Line).
Uncertainty bands (5th/95th percentiles, 25th/75th).
Food web graphs (circular layout).
Ecosystem health panels (diversity + stability metrics).
Survival probabilities and final populations.
Recommendations Engine: Priority-based advice (high/medium/low) on population sizing, timing, genetic selection, delays, or proceeding based on simulation outcomes.
Data Pipeline View: Mock visualization of data ingestion (IUCN, GBIF) and transformation steps.
Validation Module: Pre-configured scenarios for model testing.
Species Management: Add/remove species (e.g., Gray Wolf, Elk, Dodo, Woolly Mammoth) with population inputs and genetic optimization toggle.
Tech Stack
Frontend: React 18, TypeScript 5
Build Tools: Vite 5
Styling: Tailwind CSS 3, shadcn/ui (Radix UI primitives: accordion, alert-dialog, badge, button, card, chart, dialog, dropdown-menu, input, label, progress, scroll-area, select, separator, sheet, skeleton, slider, tabs, toast, tooltip)
Charts: Recharts 2
State/UI: React Router 6, TanStack Query 5, Framer Motion 12, React Hook Form 7 + Zod resolver, Sonner toasts
Utilities: clsx, class-variance-authority (cva), lucide-react icons, date-fns
Development: ESLint 9, Vitest 3, Playwright 1, PostCSS, Autoprefixer
Installation / Setup Instructions
Prerequisites: Node.js 18+, Bun (optional, lockfile present), pnpm/yarn/npm
Clone & Install:

git clone <repo>
cd rewild-predict-guide-main
bun install  # or npm/pnpm install
Development:

bun run dev  # http://localhost:8080
Build:

bun run build  # dist/ folder
bun run preview
Test:

bun run test  # Vitest
bun run test:watch
Lint:

bun run lint
No external API keys or databases required; all data bundled in src/lib/regionsData.ts.

Usage
Landing (/): Select a region card to view species.
Simulator (/simulator):
Configure species (name + population), climate scenario, genetic optimization.
Click "Run Simulation" → View results across tabs:
Tab	Content
Simulation	Charts, graphs, health panels, recommendations
Validation	Pre-defined test scenarios
Data Pipeline	Data flow visualization
Region View (/region/:regionId): Detailed location/species info.
URL params: ?location=Sahara&species=Gray Wolf:30 pre-loads configs.
Project Structure

.
├── public/                 # Static assets (logo.png, favicon.ico, placeholder.svg)
├── src/
│   ├── App.tsx            # Router + Providers (QueryClient, Tooltip)
│   ├── main.tsx           # Entry
│   ├── pages/             # Routes: Landing.tsx, Index.tsx (simulator), RegionExperience.tsx, NotFound.tsx
│   ├── components/        # UI: SpeciesCard/Modal, PopulationChart, FoodWebGraph, EcosystemHealthPanel, RecommendationsPanel, SimulationControls, PipelineViewer, ValidationModule, ui/shadcn/
│   ├── lib/               # Core logic: types.ts, regionsData.ts (regions/species), simulationEngine.ts (Monte Carlo LV), recommendationEngine.ts, dataPipeline.ts, utils.ts, validationScenarios.ts
│   ├── hooks/             # use-mobile.tsx, use-toast.ts
│   └── test/              # Vitest setup
├── package.json           # Scripts, deps (see Tech Stack)
├── vite.config.ts         # Vite config (React SWC, aliases @ -> src)
├── tailwind.config.ts     # Tailwind + shadcn
├── tsconfig*.json         # TypeScript configs
└── TODO.md                # Task tracking
Screenshots
No screenshot images present in repository.

Limitations
Deterministic trait/interaction data (hardcoded in lib files; no external fetches).
Client-side only; simulations run in-browser (performance limits for high Monte Carlo runs/years).
Simplified LV model (no spatial dynamics, age structure, migration).
Mock data pipeline/validation (no real backend/IUCN/GBIF integration).
No persistence/export of results.
View the app: bun run dev
