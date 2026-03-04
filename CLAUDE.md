# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Superteam Malaysia website — the digital hub for Solana builders in Malaysia. Part of the global Superteam network. Built as a Turborepo monorepo scaffolded with better-t-stack.

## Commands

```bash
bun install                # Install all dependencies
bun run dev                # Start all apps in dev mode (web at http://localhost:3001)
bun run dev:web            # Start only the web app
bun run build              # Build all apps for production
bun run check-types        # TypeScript type checking across all packages

# Database (PostgreSQL via Supabase local)
bun run db:push            # Push Drizzle schema changes to database
bun run db:generate        # Generate migration files
bun run db:migrate         # Run migrations
bun run db:studio          # Open Drizzle Studio UI

# Supabase local dev (run from packages/db/)
bunx supabase start        # Start local Supabase (PostgreSQL on port 54322)
bunx supabase stop         # Stop local Supabase
```

No linter or test runner is configured yet.

## Architecture

**Monorepo layout** (Turborepo + Bun workspaces):

- `apps/web` — Next.js 16 full-stack app (App Router, React 19, React Compiler enabled, `typedRoutes: true`)
- `packages/api` — tRPC routers and procedures. Defines `publicProcedure` and `protectedProcedure` (session-based auth guard). The `appRouter` and `AppRouter` type are exported from `src/routers/index.ts`.
- `packages/auth` — Better-Auth config with Drizzle adapter, email+password auth, `nextCookies()` plugin. Exports `auth` instance.
- `packages/db` — Drizzle ORM schemas (`src/schema/`), database client (`src/index.ts`), and Drizzle Kit config. PostgreSQL via Supabase local dev (port 54322).
- `packages/env` — Type-safe env validation using `@t3-oss/env-core` with Zod. Server vars in `src/server.ts`, client vars in `src/web.ts`.
- `packages/config` — Shared `tsconfig.base.json`.

**Data flow**: Browser → tRPC client (httpBatchLink to `/api/trpc`) → Next.js API route → tRPC router → Drizzle ORM → PostgreSQL

**Auth flow**: `authClient.signIn.email()` → Better-Auth sets httpOnly cookie → tRPC context extracts session via `auth.api.getSession({ headers })` → `protectedProcedure` enforces auth

## Design System

Dark theme with confident restraint. The 3D KL Skyline is the ONE hero visual; everything else is clean, visible, and stays out of its way. Avoid decorative effects (no glow orbs, no star fields, no noise textures, no gradient text on every heading).

**Color palette** (defined as CSS vars in `apps/web/src/index.css`):
- Background: deep dark `oklch(0.08 0.02 260)`
- Primary: Solana green `oklch(0.82 0.18 165)` — THE accent color for buttons, links, active states
- Extended: `--sol-purple` (used in 3D scene), `--sol-green`, `--warm`, `--coral`
- Cards: `oklch(0.12 0.02 260)` — visibly lighter than background
- Borders: `oklch(1 0 0 / 10%)` — visible, not invisible

**Fonts** (Google Fonts, loaded in `layout.tsx`):
- Display (`--font-display`): Syne — bold, geometric, distinctive headings
- Body (`--font-body`): DM Sans — clean, readable body text
- Mono (`--font-mono`): JetBrains Mono — dates, labels, code

**Design rules**:
- ONE gradient text moment per page (hero headline only). All other headings are solid white.
- Cards use `bg-card border border-border` — no glassmorphism, no backdrop-blur, no glow shadows.
- Section labels: `font-mono text-xs tracking-widest uppercase text-muted-foreground`
- Animations: use sparingly. Wrap section content in ONE `motion.div` with `whileInView`, not per-element.
- No decorative components (GlowOrb, BatikPattern, TropicalGradient, noise-overlay, star-field are all deleted).

**CSS utilities** (in `index.css`): `.animate-marquee`, `.scrollbar-hide`, `.scrollbar-thin`

**Shared components** (`components/shared/`): `KLSkyline`, `GlassCard`, `GradientText`, `MemberAvatar`, `AnimatedCounter`, `SectionHeading`, `BentoCard`, `SkillBadge`, `EventCard`, `SocialLinks`, `TextReveal`, `STMYLogo`

**3D scene** (`components/three/`): `HeroCanvas` + `SkylineScene` — React Three Fiber, KL landmarks (Petronas, KL Tower, Merdeka 118), mouse-tracked camera, instanced window lights. Only loads on mid/high-tier devices.

**Landing page sections** (`components/landing/`): `HeroSection`, `PartnersSection`, `MissionSection`, `MembersSpotlight`, `EventsSection`, `WallOfLove`, `FaqSection`, `JoinCtaSection`

**Reference site**: uae.superteam.fun

## Key Conventions

- Internal packages are imported as `@my-superteam-fun/<package>` (e.g., `@my-superteam-fun/db`, `@my-superteam-fun/auth`)
- shadcn/ui components live in `apps/web/src/components/ui/` (style: `base-lyra`, base color: `neutral`, icon library: `lucide`)
- Path aliases in web app: `@/components`, `@/lib`, `@/hooks`, `@/utils`
- CSS uses Tailwind v4 with CSS variables for theming (`apps/web/src/index.css`)
- Forms use `@tanstack/react-form`, server state uses `@tanstack/react-query`
- Toast notifications via `sonner`
- Animations use `motion/react` (Framer Motion). Prefer `whileInView` with `viewport={{ once: true }}` for scroll reveals.
- Strict TypeScript everywhere (`noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`)

## Environment Variables

Defined in `apps/web/.env`, validated by `packages/env/src/server.ts`:

```
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
BETTER_AUTH_SECRET=<min 32 chars>
BETTER_AUTH_URL=http://localhost:3001
CORS_ORIGIN=http://localhost:3001
```

## Database Schema

Auth tables are in `packages/db/src/schema/auth.ts`: `user`, `session`, `account`, `verification`. New domain schemas (members, events, partners, etc.) should be added as separate files in `packages/db/src/schema/` and re-exported from the `index.ts` barrel.

## Adding New tRPC Procedures

Add routers in `packages/api/src/routers/` and merge them into `appRouter`. Use `publicProcedure` for unauthenticated endpoints, `protectedProcedure` for authenticated ones (session available via `ctx.session`).
