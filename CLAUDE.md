# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 (App Router) blog focused on on-chain finance education and opportunities. The site is called "Hyperdashboard" and features educational content about blockchain/crypto, curated investment opportunities, and data visualizations about tokenomics (specifically Hyperliquid HYPE token).

## Development Commands

```bash
# Start development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Architecture

### Routing Structure
- **App Router**: Uses Next.js 16 App Router with TypeScript
- **Dynamic Routes**:
  - `/onboarding/[slug]` - Educational guides (concept, exchange, wallet, transfer)
  - `/opportunities/[slug]` - Investment opportunity blog posts
- **Static Content**: All blog content is currently hardcoded in the page components (not CMS-backed)

### Data Flow
- **Static Data**: `data/hype_data.json` contains revenue data and tokenomics information for Hyperliquid
- **No Backend**: Pure static site with client-side interactions
- **No Database**: Content is defined in-component as TypeScript objects

### Component Organization
```
components/
├── layout/          # Header, Footer (persistent across pages)
└── ui/              # Reusable UI components
    ├── Card.tsx
    ├── Container.tsx
    ├── Hero.tsx
    ├── Section.tsx
    └── Tokenomics*.tsx  # Data visualization components
```

### Styling System
- **Framework**: Tailwind CSS 4 with custom color scheme
- **Theme**: Dark mode with neon accents (primary: #00ff9d, secondary: #00d2ff, accent: #ff00c1)
- **Fonts**: Geist Sans and Geist Mono via next/font
- **Global Styles**: Defined in `app/globals.css` using CSS variables

### Key Components

**TokenomicsDataViz**: Canvas-based animation that visualizes Hyperliquid revenue growth, SWPE (Supply-Weighted P/E), and token accumulation over time. Uses:
- `useRef` for canvas and simulation state (performance)
- `useMemo` for pre-calculated daily interpolated data
- RequestAnimationFrame loop for smooth 60fps rendering
- Interpolates between revenue data points from `hype_data.json`

**Dynamic Pages**: Both `/onboarding/[slug]` and `/opportunities/[slug]` use:
- Server components with async params (Next.js 16 pattern)
- Hardcoded content maps (objects with slug keys)
- `notFound()` for invalid slugs

### TypeScript Configuration
- Path alias: `@/*` maps to root directory
- Strict mode enabled
- JSX runtime: `react-jsx`

## Content Management

Currently all content is hardcoded in TypeScript files:
- Onboarding guides: `app/onboarding/[slug]/page.tsx` (guides object)
- Opportunity posts: `app/opportunities/[slug]/page.tsx` (posts object)
- Homepage featured content: `app/page.tsx` (onboardingSteps and featuredOpportunities arrays)

To add new content, modify these objects directly in the respective files.

## Design Patterns

- **Container/Section Pattern**: All page content wrapped in `<Section><Container>` for consistent spacing
- **Icon Usage**: lucide-react for all icons
- **Client Components**: Marked with `"use client"` directive only when using hooks/browser APIs
- **Color Scheme**: Consistent use of text-white, text-gray-400, text-primary, bg-black variants
