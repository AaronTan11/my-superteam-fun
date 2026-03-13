# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**stmyOS** — Superteam Malaysia website, the digital hub for Solana builders in Malaysia. Part of the global Superteam network. Built as a Turborepo monorepo scaffolded with better-t-stack. The site presents as an immersive OS experience (macOS desktop ≥768px, iOS mobile <768px) with a Supabase-backed CMS admin dashboard.

## Commands

```bash
bun install                # Install all dependencies
bun run dev                # Start all apps in dev mode (web at http://localhost:3002)
bun run dev:web            # Start only the web app
bun run build              # Build all apps for production
bun run check-types        # TypeScript type checking across all packages

# Database (PostgreSQL via Supabase — remote or local)
bun run db:push            # Push Drizzle schema changes to database
bun run db:seed            # Seed database from static data (packages/db/src/seed.ts)
bun run db:generate        # Generate migration files
bun run db:migrate         # Run migrations
bun run db:studio          # Open Drizzle Studio UI
```

No linter or test runner is configured yet.

## Architecture

**Monorepo layout** (Turborepo + Bun workspaces):

- `apps/web` — Next.js 16 full-stack app (App Router, React 19, React Compiler enabled, `typedRoutes: true`)
- `packages/api` — tRPC routers and procedures. Defines `publicProcedure`, `protectedProcedure`, `adminProcedure`, `editorProcedure`. The `appRouter` and `AppRouter` type are exported from `src/routers/index.ts`.
- `packages/auth` — Better-Auth config with Drizzle adapter, email+password auth, `nextCookies()` plugin, `user.additionalFields.role` for RBAC. Exports `auth` instance.
- `packages/db` — Drizzle ORM schemas (`src/schema/`), database client (`src/index.ts`), seed script (`src/seed.ts`), and Drizzle Kit config. PostgreSQL via Supabase (remote pooler or local port 54322).
- `packages/env` — Type-safe env validation using `@t3-oss/env-core` with Zod. Server vars in `src/server.ts`, client vars in `src/web.ts`.
- `packages/config` — Shared `tsconfig.base.json`.

**Data flow**: Browser → tRPC client (httpBatchLink to `/api/trpc`) → Next.js API route → tRPC router → Drizzle ORM → PostgreSQL

**Auth flow**: `authClient.signIn.email()` → Better-Auth sets httpOnly cookie → tRPC context extracts session via `auth.api.getSession({ headers })` → `protectedProcedure` enforces auth → `adminProcedure`/`editorProcedure` enforce RBAC via `session.user.role`

## CMS / Admin Dashboard

Full CRUD admin dashboard at `/admin` with RBAC (Admin / Editor / User roles).

**Auth guard**: `app/admin/layout.tsx` — server component checks session + role, redirects non-admin/editor to `/`.

**Admin routes**: `/admin` (dashboard), `/admin/members`, `/admin/events`, `/admin/partners`, `/admin/testimonials`, `/admin/faq`, `/admin/stats`, `/admin/settings` (user role management, admin-only).

**Components** (`components/admin/`): `admin-shell.tsx`, `admin-sidebar.tsx`, `data-table.tsx` (generic @tanstack/react-table), `delete-dialog.tsx`, `member-form.tsx`, `event-form.tsx`, `partner-form.tsx`, `testimonial-form.tsx`, `faq-form.tsx`

**tRPC routers** (`packages/api/src/routers/`): `members.ts`, `events.ts`, `partners.ts`, `testimonials.ts`, `faq.ts`, `stats.ts`, `admin.ts` — all with Zod validation. Public reads use `publicProcedure`, writes use `editorProcedure` or `adminProcedure`.

**Database tables** (`packages/db/src/schema/`): `auth.ts` (user with role column, session, account, verification), `members.ts`, `events.ts`, `partners.ts`, `testimonials.ts`, `faq.ts`, `stats.ts`. All content tables have `sortOrder`, `createdAt`, `updatedAt`.

**Admin user setup**: Sign up via `/login`, then set `role = 'admin'` in DB: `UPDATE "user" SET role = 'admin' WHERE email = '...'`

**tRPC cache invalidation**: Use `trpc.<router>.<procedure>.queryOptions().queryKey` for invalidation (not `.queryKey()` standalone — that doesn't exist in tRPC v11).

## Desktop OS Architecture

The site uses **dual OS metaphors**: macOS desktop (≥768px) and iOS mobile (<768px). Both present content through app-like experiences rather than traditional web pages.

**Entry point**: `app/page.tsx` wraps content in `<DesktopShell>`. On desktop, it renders the full macOS chrome (boot screen → menu bar, dock, desktop icons, windows). On mobile, it renders `<MobileShell>` (iOS lock screen → home screen → app views). Landing section children are kept in `<noscript>` for SEO crawlers.

**Components** (`components/desktop/`):
- `boot-screen.tsx` — macOS-style boot sequence: STMY logo → progress bar → fade to desktop. Waits for `document.fonts.ready` + min 1.8s. sessionStorage caching (once per session). Respects `prefers-reduced-motion`.
- `desktop-shell.tsx` — top-level: CSS-based mobile/desktop branch (`md:hidden` / `hidden md:block`). Desktop branch has boot screen overlay. Mobile branch renders `<MobileShell>`.
- `desktop-context.tsx` — React Context + `useReducer` for window state. Provides: `openApp`, `closeWindow`, `focusWindow`, `minimizeWindow`, `toggleMaximize`
- `desktop-reducer.ts` — pure reducer: OPEN/CLOSE/FOCUS/MINIMIZE/MAXIMIZE/RESTORE/MOVE/RESIZE window actions
- `types.ts` — `AppType` (7 apps), `WindowState`, `DesktopState`, `DesktopAction`, constants (`MENU_BAR_HEIGHT=28`, `DOCK_HEIGHT=72`)
- `app-config.ts` — default sizes, titles, Lucide icons per AppType
- `window.tsx` — draggable window (Framer Motion `drag` + `dragControls` from title bar), animated position/size. Glass chrome: semi-transparent bg with `backdrop-filter: blur(40px) saturate(1.4)`, layered shadows. Content area stays solid `bg-card`.
- `window-title-bar.tsx` — traffic lights (gray→colored on group-hover), double-click to maximize. Darker than window body (`oklch(0.13)`).
- `resize-handles.tsx` — 8-directional resize (N/S/E/W/NE/NW/SE/SW) via pointer events
- `desktop.tsx` — viewport: wallpaper layers + desktop icons + windows. Has keyboard shortcuts + URL sync
- `desktop-icons.tsx` — 7 macOS-style icons on right side. Glass tiles with backdrop-blur. Single-click selects, double-click opens app.
- `menu-bar.tsx` — 28px top bar: STMY logo, active window title, decorative menus, live clock. Glass with backdrop-blur.
- `dock.tsx` — bottom dock: 7 app icons + separator + external links (X, Telegram, Discord). **macOS fish-eye magnification** via `useDockMagnification` hook (cosine falloff + spring physics, `useMotionValue`/`useTransform`/`useSpring`). Glass pill with backdrop-blur. Active dots for open apps.
- `app-renderer.tsx` — `React.lazy` maps AppType → component
- `use-keyboard-shortcuts.ts` — `Cmd+W` close, `Cmd+M` minimize, `` Cmd+` `` cycle, `Cmd+1-7` quick-launch
- `use-media-query.ts` — responsive breakpoint hook

**App components** (`components/desktop/apps/`): `home-app.tsx`, `members-app.tsx`, `events-app.tsx`, `mission-app.tsx`, `testimonials-app.tsx`, `faq-app.tsx`, `about-app.tsx`

**Z-index scale**: Wallpaper z-0 → Desktop icons z-[1] → Windows z-[10+N] → Dock z-[9000] → Menu bar z-[9999] → Boot screen z-[99999]

## Mobile OS Architecture

iOS-style experience on viewports <768px. Components in `components/mobile/`.

**Screen flow**: Lock screen → (swipe up) → Home screen → (tap icon) → App view → (back/swipe right) → Home screen

**Components** (`components/mobile/`):
- `mobile-shell.tsx` — top-level container (`h-[100dvh]`), composes StatusBar + screen router + HomeIndicator
- `mobile-context.tsx` — React Context + `useReducer` for screen state (lock/home/app). Provides: `unlock`, `openApp`, `closeApp`. Browser history integration (back button closes app).
- `mobile-app-config.ts` — app icon configs (labels, Lucide icons, color tints), dock favorites, constants (`STATUS_BAR_HEIGHT=44`, `HOME_INDICATOR_HEIGHT=34`)
- `status-bar.tsx` — 44px iOS status bar: time, dynamic island pill, signal/wifi/battery icons. Backdrop-blur.
- `home-indicator.tsx` — 34px bottom pill (134×5px, `bg-white/30`)
- `lock-screen.tsx` — wallpaper + large clock (Syne 72px) + date + STMY logo. Swipe-up gesture via `motion.div drag="y"` to unlock.
- `home-screen.tsx` — wallpaper + 4-column app icon grid + frosted glass dock (4 favorites). Icons are 60×60 rounded-[14px] with tinted backgrounds.
- `app-view.tsx` — full-screen app container with `clipPath: circle()` zoom animation from icon origin. Back button + swipe-right to close.
- `mobile-app-content.tsx` — `React.lazy` maps AppType → same desktop app components. Reuses `home-app.tsx`, `members-app.tsx`, etc.
- `mobile-wallpaper.tsx` — portrait-tuned wallpaper (aurora gradients + KL skyline at 35% opacity)

**State management**: Same pattern as desktop — React Context + `useReducer`, sessionStorage for skip-lock-on-repeat-visit.

**Shared with desktop**: `AppType`, all 7 app components, `STMYLogo`, `KLSkyline`, theme colors.

**Wallpaper**: Layered atmospheric background — diagonal gradient sky, scattered stars with **STMY constellation** easter egg (subtle green dots + connecting lines, opacity 0.35), animated aurora glows (sol-purple 40% + sol-green 35%, 60s/45s drift), KL Skyline SVG at 45% opacity, ground glow. Stars have CSS twinkle animation on ~1/7 of them.

**URL sync**: `window.history.replaceState` updates URL when active window changes. Uses real path-based routes (`/events`, `/members`, etc.) mapped via `lib/app-routes.ts`. Does NOT use `router.push` to avoid triggering Next.js navigation. Each app has a real Next.js route page (`app/events/page.tsx`, etc.) that renders `<DesktopShell initialApp="...">` for direct URL access and SEO. Mobile deep links: visiting `/events` on mobile skips lock screen and opens Events app directly.

## Design System

Dark theme with confident restraint. The KL Skyline is the signature visual; everything else is clean, visible, and stays out of its way. Avoid decorative effects (no glow orbs, no noise textures, no gradient text on every heading). The STMY constellation in the wallpaper is an intentional easter egg, not generic decoration.

**Color palette** (defined as CSS vars in `apps/web/src/index.css`):
- Background: deep dark `oklch(0.08 0.02 260)`
- Primary: Solana green `oklch(0.82 0.18 165)` — THE accent color for buttons, links, active states
- Extended: `--sol-purple` (used in wallpaper aurora), `--sol-green`, `--warm`, `--coral`
- Cards: `oklch(0.18 0.02 260)` — visibly lighter than background
- Borders: `oklch(1 0 0 / 15%)` — visible, not invisible

**Fonts** (Google Fonts, loaded in `layout.tsx`):
- Display (`--font-display`): Syne — bold, geometric, distinctive headings
- Body (`--font-body`): DM Sans — clean, readable body text
- Mono (`--font-mono`): JetBrains Mono — dates, labels, code

**Design rules**:
- ONE gradient text moment per page (hero headline only). All other headings are solid white.
- Content cards use `bg-card border border-border` — no glow shadows. OS chrome (window frame, dock, menu bar, desktop icons) uses glass effects (`backdrop-filter: blur + saturate`) with semi-transparent backgrounds to pick up wallpaper color. Card content areas stay solid `bg-card` for text readability.
- Section labels: `font-mono text-xs tracking-widest uppercase text-muted-foreground`
- Animations: use sparingly. Wrap section content in ONE `motion.div` with `whileInView`, not per-element.
- No decorative components (GlowOrb, BatikPattern, TropicalGradient, noise-overlay, star-field are all deleted).
- Desktop window traffic lights: gray `#3C3C3C` by default, colored on `group-hover` (red/yellow/green — real macOS dark mode behavior)

**CSS utilities** (in `index.css`): `.animate-marquee`, `.scrollbar-hide`, `.scrollbar-thin`, `.animate-aurora-drift`, `.animate-aurora-drift-reverse`, `.animate-twinkle`

**Shared components** (`components/shared/`): `KLSkyline`, `GlassCard`, `GradientText`, `MemberAvatar`, `AnimatedCounter`, `SectionHeading`, `BentoCard`, `SkillBadge`, `EventCard`, `SocialLinks`, `TextReveal`, `STMYLogo`

**Landing page sections** (`components/landing/`): `HeroSection`, `PartnersSection`, `MissionSection`, `MembersSpotlight`, `EventsSection`, `WallOfLove`, `FaqSection`, `JoinCtaSection` — kept in `<noscript>` for SEO. Content adapted into desktop/mobile app components.

**Brand assets** (`public/images/brand/`): `logomark-white.png`, `logomark-black.png`, `wordmark-white.png`, `wordmark-black.png`, `wordmark-whiteonblack.png`. Original hi-res @4x files in `public/Logomark/` and `public/Wordmark/`. `STMYLogo` component uses real logomark PNG.

**Desktop icon colors**: Each app has a gradient defined in `app-config.ts` `gradient` field. Desktop icons and dock icons both use these gradients. Home app renders the STMY logomark instead of a Lucide icon.

**Luma integration**: Luma checkout widget loaded via `next/script` in `layout.tsx`. Events app uses `data-luma-action="checkout"` on RSVP buttons. Event data has `lumaUrl` fields with `lu.ma/` URLs.

**Reference site**: uae.superteam.fun

## Key Conventions

- Internal packages are imported as `@my-superteam-fun/<package>` (e.g., `@my-superteam-fun/db`, `@my-superteam-fun/auth`)
- shadcn/ui components live in `apps/web/src/components/ui/` (style: `base-lyra` using `@base-ui/react` NOT Radix — no `asChild` prop, use `render` prop instead). Icon library: `lucide`.
- Path aliases in web app: `@/components`, `@/lib`, `@/hooks`, `@/utils`
- CSS uses Tailwind v4 with CSS variables for theming (`apps/web/src/index.css`)
- Forms use `@tanstack/react-form`, server state uses `@tanstack/react-query`
- Toast notifications via `sonner`
- Animations use `motion/react` (Framer Motion). Prefer `whileInView` with `viewport={{ once: true }}` for scroll reveals.
- Strict TypeScript everywhere (`noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`)
- tRPC v11 with `createTRPCOptionsProxy` — use `trpc.xxx.queryOptions()` for queries, `trpc.xxx.mutationOptions()` for mutations

## Environment Variables

Defined in `apps/web/.env`, validated by `packages/env/src/server.ts`:

```
DATABASE_URL=postgresql://postgres.xxx:password@aws-1-ap-south-1.pooler.supabase.com:6543/postgres
BETTER_AUTH_SECRET=<min 32 chars>
BETTER_AUTH_URL=http://localhost:3002
CORS_ORIGIN=http://localhost:3002
```

For Vercel deployment, set `BETTER_AUTH_URL` and `CORS_ORIGIN` to the production URL. `turbo.json` has `env` array declaring these for the build task.

## Database Schema

Auth tables in `packages/db/src/schema/auth.ts`: `user` (with `role` column: "admin" | "editor" | "user"), `session`, `account`, `verification`. Content tables in separate files: `members.ts`, `events.ts`, `partners.ts`, `testimonials.ts`, `faq.ts`, `stats.ts`. All re-exported from `schema/index.ts`. Seed script at `packages/db/src/seed.ts`.

## Adding New tRPC Procedures

Add routers in `packages/api/src/routers/` and merge them into `appRouter` in `routers/index.ts`. Use `publicProcedure` for unauthenticated, `protectedProcedure` for authenticated, `editorProcedure` for content management, `adminProcedure` for admin-only operations.

## Remaining Work

- **Public API migration**: Switch app components from static `data/*.ts` imports to `trpc.xxx.list.useQuery()` calls (use static data as `placeholderData`)
- **Newsletter signup**: Optional, not yet implemented
