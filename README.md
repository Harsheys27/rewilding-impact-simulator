# Rewilding Impact Simulator

An AI-powered ecosystem modeling platform that simulates species reintroduction and predicts long-term ecological outcomes using Monte Carlo simulations, climate scenarios, and food-web interactions.

## Overview

Rewilding Impact Simulator is an interactive web application that enables users to explore ecosystems around the world and evaluate the impact of reintroducing extinct species into existing habitats. The simulator models population dynamics, species interactions, climate change effects, uncertainty, and ecosystem stability to generate data-driven recommendations for conservation strategies.

---

## Features

* 🌎 Explore different regions and ecosystems
* 🦣 Reintroduce extinct species into existing habitats
* 📈 Run Monte Carlo ecosystem simulations
* 🌡️ Simulate multiple climate scenarios
* 🌿 Analyze population trajectories over time
* 📊 Visualize uncertainty bands and survival probabilities
* 🕸️ Generate food-web interaction graphs
* 💚 Evaluate ecosystem health and stability
* 🤖 Produce recommendation messages for conservation planning
* 🔬 Validate simulations using historical case studies
* ⚙️ Inspect the complete simulation pipeline

---

## Tech Stack

### Frontend

* React 18
* TypeScript
* Vite
* Tailwind CSS
* React Router DOM
* Framer Motion
* Recharts
* Lucide React

### State Management

* TanStack Query

### Testing

* Vitest
* Playwright

---

## Project Architecture

```text
src/
│
├── pages/               # Application pages
├── components/          # UI Components
├── components/ui/       # Reusable UI elements
├── lib/                 # Core simulation logic
├── regionsData.ts       # Ecosystem and species datasets
├── simulationEngine.ts  # Monte Carlo simulation engine
├── recommendationEngine.ts
├── dataPipeline.ts
└── validationScenarios.ts
```

---

# How It Works

### 1. Region Selection

Users browse regions and ecosystems and select species already present in the habitat.

### 2. Species Reintroduction

Extinct species can be added to the ecosystem to simulate rewilding scenarios.

### 3. Simulation Engine

The platform models:

* Birth and death rates
* Carrying capacity
* Climate adaptation
* Species interactions
* Competition and predation
* Environmental noise
* Extreme climate events
* Genetic fitness

using Monte Carlo simulations.

### 4. Analysis

The simulator generates:

* Population trends
* Survival probabilities
* Ecosystem health scores
* Stability metrics
* Trophic interactions
* Conservation recommendations

---

# 📊 Simulation Components

## Population Dynamics

Models species populations over time using:

* Logistic growth
* Interaction coefficients
* Climate survival modifiers
* Environmental noise
* Allee effects

---

## Climate Scenarios

Supports future climate projections and temperature changes to analyze ecosystem resilience.

---

## Food Web Analysis

Automatically generates trophic interactions including:

* Predation
* Competition
* Ecosystem relationships

---

## Uncertainty Analysis

Multiple Monte Carlo runs provide:

* Confidence intervals
* Uncertainty bands
* Survival probabilities

---

## Recommendation Engine

Generates AI-assisted conservation strategies based on:

* Ecosystem stability
* Population viability
* Climate conditions
* Species survival probability

---

# Validation Module

Includes scenario-based validation using historical ecological restoration examples such as:

* Yellowstone Wolf Reintroduction

This allows comparison between simulated and known ecological outcomes.

---

# Visualization

The platform provides:

* Population charts
* Ecosystem health metrics
* Food-web graphs
* Survival probability analysis
* Recommendation panels
* Data pipeline visualizations

---

# Core Algorithms

* Monte Carlo Simulation
* Logistic Population Growth
* Species Interaction Modeling
* Trophic Network Analysis
* Climate-Aware Population Dynamics
* Ecosystem Stability Assessment
* Recommendation Generation

---

# 🛠 Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/rewilding-impact-simulator.git
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

---

# Future Improvements

* Graph Neural Networks for food-web analysis
* Real biodiversity datasets integration
* Satellite and climate data APIs
* Multi-agent ecosystem modeling
* Reinforcement learning for conservation optimization
* Species migration simulations
* Genetic evolution and adaptation modules
* AI-powered policy recommendation system

---

#  Author

**Harshit Chaturvedi**

B.Tech Computer Science and Engineering
SRM Institute of Science and Technology

---

## If you found this project interesting, consider giving the repository a star!:)
