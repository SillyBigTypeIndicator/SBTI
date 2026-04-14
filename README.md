# Silly Big Type Indicator (SBTI)

**SBTI** is a playful, internet-native personality lab: a main “Silly Big Type” test (28 questions), a compact four-letter type system (16 types), and a **provider-based integration layer** that maps other personality-style inputs into one shared normalized trait graph—then into SBTI via a deterministic rules engine.

> **Disclaimer:** For entertainment and self-reflection only—not scientific diagnosis, education, or hiring. This project is an **original parody** with its own identity; it is **not** affiliated with any similarly named organization or website.

**Screenshots:** add PNGs under `docs/screenshots/` (see `docs/screenshots/README.md`) and embed them here for GitHub.

## Features

- **Landing** (`/`) — hero, example type cards, integrations overview  
- **Main test** (`/test`) — animated flow, progress, Zustand + local persistence  
- **Results** (`/result/[type]`) — full type card, compatibility links, share payload, **OG image**  
- **Compare** (`/compare`) — overlap/contradiction, “appearance vs reality” blurb, **radar chart**  
- **Integrations** (`/integrations`, `/integrations/[provider]`) — registry of adapters  
- **Dev JSON lab** (`/dev/pack`) — validate custom trait JSON  
- **API** — `POST /api/compare`, `GET /api/share?type=EOVA`, `GET /api/session`  
- **Persistence** — Prisma + SQLite (dev); swap `DATABASE_URL` for Postgres in production  

## Architecture

| Area | Location |
|------|----------|
| SBTI questions & axis scoring | `src/lib/sbti/` |
| Normalized trait graph (0–100) | `src/lib/traits/schema.ts` |
| Provider adapters | `src/lib/providers/adapters/` |
| Registry + validation | `src/lib/providers/registry.ts`, `validate.ts` |
| Rules engine (normalized → SBTI letters) | `src/lib/providers/rules-engine.ts` |
| Comparison | `src/lib/comparison/engine.ts` |
| Public API surface | `src/lib/functions.ts` |
| Provider templates & docs | `src/tests/registry/` |

### Scoring model (main test)

Four axes are derived from weighted answers (**E/I**, **O/L**, **V/M**, **A/P**), each on a 0–100 scale. The four letters are chosen by whether each score is ≥ 50. The 16 type codes are the Cartesian product of those dichotomies; copy and metadata live in `src/lib/sbti/types-catalog.ts`.

### Integrations (adapters)

Each adapter implements `PersonalityTestAdapter`:

- **`normalizeResult`** — maps manual / quiz / JSON input → `NormalizedTraitProfile`  
- **`mapToSBTI`** — uses `mapNormalizedToSBTI` (shared rules engine)  
- **`getResultLabel`** — human-readable summary for history rows  

Built-in examples: **Four-Letter Compass (style)**, **Ocean Five (style)**, **Nine Archetype Map (style)**, **Custom JSON trait pack**.

### Adding a provider (≈10 minutes)

1. Copy `src/tests/registry/example-provider.template.ts`.  
2. Implement `normalizeResult` + `getResultLabel`; reuse `mapNormalizedToSBTI` for mapping.  
3. Call `registerPersonalityProvider(yourAdapter)` from a small module imported by `src/lib/providers/registry.ts` (or a dedicated `register-extra.ts`).  
4. Run `npm test` and exercise `/compare` + `/dev/pack`.

## Scripts

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run db:seed      # optional demo user + sample comparisons
npm run dev
npm test
npm run build
```

## Deployment (Vercel)

1. Push this repo to GitHub and import into Vercel.  
2. Set **`DATABASE_URL`** to a hosted **Postgres** URL (recommended for serverless). Run `npx prisma migrate deploy` in the build command or as a release step.  
3. Set **`NEXT_PUBLIC_SITE_URL`** to your production URL (Open Graph + metadata base).  
4. SQLite file URLs are fine for local dev only—not ideal on serverless volumes.

## Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui (Base UI) · Framer Motion · Zustand · Zod · Prisma 6 · Vitest · Recharts

Optional: Auth.js is listed in dependencies for future email/OAuth; the app ships with **anonymous cookie sessions** via `/api/session`.

## API surface (library)

Implemented in `src/lib/functions.ts`:

`takeSBTITest`, `scoreSBTIResult`, `generateSBTIType`, `saveSubmission`, `importExternalPersonalityResult`, `normalizeExternalTestResult`, `comparePersonalitySystems`, `registerPersonalityProvider`, `getAvailablePersonalityProviders`, `compareWithProvider`, `generateShareCardPayload`, `exportUserProfile`

## Roadmap

- [ ] Optional Auth.js flows + account linking  
- [ ] Server-side share PNG generation (beyond JSON download)  
- [ ] More first-party “mini quizzes” per adapter  
- [ ] Plugin hot-loading from `/src/tests/registry` without editing core registry  

## Contributing & license

See [CONTRIBUTING.md](./CONTRIBUTING.md). Licensed under [MIT](./LICENSE).
