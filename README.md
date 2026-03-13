# Superteam Malaysia

The digital hub for Solana builders in Malaysia. Part of the [global Superteam network](https://superteam.fun).

Built as an **immersive OS experience** — macOS desktop on large screens, iOS mobile on phones — where every section is an "app" you open, drag, resize, and navigate with keyboard shortcuts.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router, React 19, React Compiler) |
| Styling | Tailwind CSS v4, CSS variables theming |
| Animation | Framer Motion (`motion/react`) |
| 3D | React Three Fiber, Three.js, Drei |
| API | tRPC (httpBatchLink) |
| ORM | Drizzle ORM |
| Database | PostgreSQL (Supabase local dev) |
| Auth | Better Auth (email + password, session cookies) |
| Monorepo | Turborepo + Bun workspaces |
| Fonts | Syne (display), DM Sans (body), JetBrains Mono (mono) |

## Prerequisites

- [Bun](https://bun.sh) >= 1.3
- [Docker](https://www.docker.com/) (for Supabase local dev)

## Getting Started

```bash
# Install dependencies
bun install

# Copy environment variables
cp apps/web/.env.example apps/web/.env

# Start local Supabase (PostgreSQL on port 54322)
cd packages/db && bunx supabase start && cd ../..

# Push database schema
bun run db:push

# Start dev server
bun run dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser.

## Environment Variables

Create `apps/web/.env`:

```
DATABASE_URL=postgresql://postgres:postgres@127.0.0.1:54322/postgres
BETTER_AUTH_SECRET=<min 32 chars>
BETTER_AUTH_URL=http://localhost:3002
CORS_ORIGIN=http://localhost:3002
```

## Project Structure

```
my-superteam-fun/
├── apps/
│   └── web/                     # Next.js 16 app (port 3002)
│       └── src/
│           ├── app/             # App Router pages + API routes
│           ├── components/
│           │   ├── desktop/     # macOS desktop OS (≥768px)
│           │   ├── mobile/      # iOS mobile experience (<768px)
│           │   ├── landing/     # SEO landing page sections
│           │   ├── shared/      # Reusable components
│           │   ├── three/       # 3D scene (React Three Fiber)
│           │   └── ui/          # shadcn/ui primitives
│           ├── data/            # Static data (members, events, partners)
│           └── lib/             # Utilities, constants, routes
├── packages/
│   ├── api/                     # tRPC routers and procedures
│   ├── auth/                    # Better Auth config + Drizzle adapter
│   ├── db/                      # Drizzle ORM schemas + client
│   ├── env/                     # Type-safe env validation (Zod)
│   └── config/                  # Shared tsconfig
├── CLAUDE.md                    # AI assistant instructions
└── turbo.json                   # Turborepo pipeline config
```

## Architecture

### Dual OS Metaphor

- **Desktop (≥768px)**: macOS-style experience with draggable/resizable windows, dock with fish-eye magnification, menu bar, desktop icons, keyboard shortcuts (`Cmd+W`, `Cmd+M`, `` Cmd+` ``)
- **Mobile (<768px)**: iOS-style experience with lock screen, home screen icon grid, full-screen app views with circle-expand transitions

### 7 Apps

Home, Members, Events, Mission, Testimonials, FAQ, About — each accessible as a window (desktop) or full-screen view (mobile).

### URL Sync

Real path-based routes (`/events`, `/members`, etc.) via `window.history.replaceState`. Direct URL access renders the OS with that app pre-opened. Mobile deep links skip the lock screen.

### Design System

- **Primary color**: Solana green `oklch(0.82 0.18 165)`
- **Background**: Deep dark `oklch(0.08 0.02 260)`
- **Cards**: Solid `bg-card` with visible borders (no glassmorphism on content)
- **OS chrome**: Glass effects (`backdrop-filter: blur + saturate`) on dock, menu bar, window frames
- **Signature visual**: KL Skyline SVG as desktop wallpaper

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start all apps in dev mode |
| `bun run dev:web` | Start only the web app |
| `bun run build` | Build all apps for production |
| `bun run check-types` | TypeScript type checking |
| `bun run db:push` | Push Drizzle schema to database |
| `bun run db:generate` | Generate migration files |
| `bun run db:migrate` | Run migrations |
| `bun run db:studio` | Open Drizzle Studio UI |

## Deployment

Deploy the `apps/web` directory to [Vercel](https://vercel.com). The monorepo is auto-detected by Turborepo.

## License

MIT
