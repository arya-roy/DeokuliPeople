# DeokuliPeople

A React + Vite genealogy and community portal for the Deokuli people.

## Overview

This application provides:

- A localized, multi-language interface (English, Hindi, Maithili, Kaithi)
- A searchable people directory
- Individual person profiles with family and genealogy links
- Ancestor, descendant, and combined family tree visualizations
- Descendant statistics grouped by generation
- Community group summary pages and group member lists
- Two Panji genealogy views for lineage tracking

## Features

### Navigation

- Home dashboard with community statistics and feature cards
- People List
- Tree View
- Group summary pages
- Language selector for UI translations

### Data-driven genealogy tools

- Searchable person directory
- Dynamic family tree rendering via `react-d3-tree`
- Ancestor and descendant explorer pages
- Combined family tree graph
- Panji genealogy lineage tracking

### Group & community support

- Group summary table
- Group member listing
- Detailed group pages with metadata

## Project structure

- `src/App.jsx` — main router and navigation
- `src/pages/` — page views for home, people, trees, groups, and panji
- `src/i18n/` — translation and locale data
- `src/data/` — additional static data used in the UI
- `src/utils/` — utility functions for tree building and data loading
- `vite.config.js` — Vite build configuration

## Local setup

Install dependencies and run the app locally:

```bash
cd deokulipeople
npm install
npm run dev
```

Then open the URL shown in the terminal, typically:

- `http://127.0.0.1:5173`
- `http://localhost:5173`

## Production build

Build and preview a production version:

```bash
cd deokulipeople
npm run build
npm run preview
```

## Dependencies

- React
- Vite
- React Router
- `react-d3-tree`
- `i18next` / `react-i18next`
- `recharts`, `chart.js`, `react-chartjs-2`
- `slugify`
- `swiper`

## Notes

- This project is designed to explore a large genealogy dataset stored in JSON.
- It uses dynamic loading for large data files to reduce initial bundle size.
- The project includes UI translation support and a responsive dashboard layout.
