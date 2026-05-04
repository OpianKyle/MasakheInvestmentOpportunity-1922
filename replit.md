# Masakhe SMME Builder — Investor Relations

## Overview
A React + Vite + Hono + Tailwind CSS v4 + Cloudflare Workers investor relations landing page for Masakhe SMME Builder. The site targets South African SMMEs and presents an investor pitch with traction, pricing, and contact sections.

## Stack
- **Frontend**: React 19, Vite 7, Tailwind CSS v4 (CSS-first, no tailwind.config.js)
- **Backend**: Hono on Cloudflare Workers (`/api/*` routes)
- **Database**: Drizzle ORM + Cloudflare D1 (SQLite)
- **Storage**: Cloudflare R2
- **Auth**: better-auth
- **Routing**: wouter
- **Package Manager**: bun

## Project Structure
- `src/web/` — React frontend (pages, components, hooks, styles)
- `src/api/` — Hono API server (index.ts + database schema/migrations)
- `public/` — Static assets (favicon, logo, og-image, runable.js)
- `vite/plugins/` — Custom Vite plugins (runable-analytics-plugin)
- `website.config.json` — Site name, description, URL, port config

## Dev Server
- Runs on `0.0.0.0:5000` via `bun run dev`
- Vite integrates Cloudflare Workers via `@cloudflare/vite-plugin`
- `allowedHosts: true` for Replit proxy compatibility

## Key Config Files
- `vite.config.ts` — Vite + Cloudflare + Tailwind + React plugins
- `wrangler.json` — Cloudflare Workers config (D1 DB, R2 bucket, assets)
- `drizzle.config.ts` — Drizzle ORM with D1 HTTP driver
- `components.json` — shadcn/ui config

## Tailwind CSS v4 Notes
**CRITICAL**: This project uses Tailwind CSS v4.
- No `tailwind.config.js`, no `postcss.config.js`, no `@tailwind` directives
- All config is CSS-first via `@theme` in `src/web/styles.css`
- Uses `@tailwindcss/vite` plugin

## Database
- Schema: `src/api/database/schema.ts`
- Migrations: `src/api/migrations/`
- Commands: `bun db:generate` (generate), `bun db:migrate` (apply locally)

## Deployment
- Configured as static deployment with `bun run build` → `dist/client`
- Production: Cloudflare Workers serving built assets + API
