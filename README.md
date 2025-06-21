# Xenous Monorepo



## Features

- **TypeScript** - For type safety and improved developer experience
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Hono** - Lightweight, performant server framework
- **oRPC** - End-to-end type-safe APIs with OpenAPI integration
- **Node.js** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Better Auth** - Authentication framework
- **Turborepo** - Optimized monorepo build system
- **Biome** - Linting and formatting



## Getting Started

First, install the dependencies:

- Node.js, version `22.11.0` or higher
- PNPM, version `10.12.1`
- Bore, for tunneling server (optional)

```bash
# Use required Node version if using NVM
nvm use

# Use required pnpm version
corepack enable

# Install dependencies
pnpm install
```

## When it's time to add a new package

To add a new package, simply run `pnpm turbo gen init` in the monorepo root. This will prompt you for a package name as well as if you want to install any dependencies to the new package (of course you can also do this yourself later).

The generator sets up the `package.json`, `tsconfig.json` and a `index.ts`, as well as configures all the necessary configurations for tooling around your package such as formatting, linting and typechecking. When the package is created, you're ready to go build out the package.

## Project Structure

```
.github
  └─ workflows
      └─ CI with pnpm cache setup
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ server
  │   └─ Backend API (Hono, ORPC)
  └─ web
      └─ Web application (Next.js)
packages
  ├─ db
  │   └─ Typesafe db schema using Drizzle & Postgres
  ├─ logger
  │   └─ Simple logger utility using consola
  ├─ ui
  │   └─ UI package for the webapp using shadcn-ui
  └─ validators
      └─ Zod validation schemas
tooling
  ├─ biome
  │   └─ Shared biome configuration
  ├─ tailwind
  │   └─ Shared tailwind configuration
  └─ typescript
      └─ Shared tsconfig you can extend from
```

## Available Scripts

- `pnpm dev`: Start all applications in development mode
- `pnpm dev:server`: Start only the server
- `pnpm dev:web`: Start only the web application
- `pnpm build`: Build all applications
- `pnpm check`: Run Biome formatting and linting
- `pnpm check:fix`: Fix Biome formatting and linting issues
- `pnpm typecheck`: Check TypeScript types across all apps
- `pnpm db:push`: Push schema changes to database
- `pnpm db:studio`: Open database studio UI
