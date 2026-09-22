# Xenous Monorepo



## Features

- **TypeScript** - For type safety and improved developer experience
- **TanStack Start** - Full-stack React framework
- **Next.js** - Full-stack React framework
- **TailwindCSS** - Utility-first CSS for rapid UI development
- **shadcn/ui** - Reusable UI components
- **Nitro + H3** - Universal server toolkit
- **oRPC** - End-to-end type-safe APIs with OpenAPI integration
- **Node.js** - Runtime environment
- **Drizzle** - TypeScript-first ORM
- **PostgreSQL** - Database engine
- **Better Auth** - Authentication framework
- **Turborepo** - Optimized monorepo build system
- **Biome** - Linting and formatting



## Getting Started

First, install the dependencies:

- Node.js, version `24.11.0` or higher
- PNPM, version `12.4.2`

```bash
# Use required Node version if using NVM
nvm use

# Use required pnpm version
corepack enable

# Rename project
pnpm rename <name_instead_of_xenous>

# Install dependencies
pnpm install
```

### Environment variables

Env vars are managed by [Varlock](https://varlock.dev). The committed `.env.schema` files are the
source of truth — there are no `.env.example` files to copy. Each key is declared by the package
that owns it and pulled in elsewhere with `@import`, so the schema next to the code is the
reference for what that package needs.

Put secret values in the git-ignored `.env.local` of the package whose schema declares them.
`dev` and `build` validate everything automatically, so there is no separate check step.

`pnpm env:scan` checks that no secret value has been pasted into source; it also runs on
pre-commit. Everything else is the [Varlock CLI](https://varlock.dev/reference/cli/load-and-run/),
run from inside the package you care about — `varlock load` to see its resolved config with
secrets masked, `varlock encrypt --file .env.local` to encrypt values at rest.

## When it's time to add a new package

To add a new package, simply run `pnpm turbo gen init` in the monorepo root. This will prompt you for a package name as well as if you want to install any dependencies to the new package (of course you can also do this yourself later).

The generator sets up the `package.json`, `tsconfig.json` and a `index.ts`, as well as configures all the necessary configurations for tooling around your package such as formatting, linting and typechecking. When the package is created, you're ready to go build out the package.

## Project Structure

```
.github
  └─ workflows
      ├─ CI with pnpm cache setup
      └─ Versioning workflow (disabled by default)
.vscode
  └─ Recommended extensions and settings for VSCode users
apps
  ├─ server
  │   └─ Backend API (Nitro, H3, ORPC)
  ├─ tanstack
  │   └─ Web application (Tanstack Start)
  └─ next
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
  ├─ github
  │   └─ Github Actions setup configuration
  └─ typescript
      └─ Shared tsconfig you can extend from
```

## Versioning with Changesets

This template includes a GitHub Actions workflow for automated versioning via [Changesets](https://github.com/changesets/changesets). It is **disabled by default**.

### Setup

1. Install the Changesets CLI as a dev dependency:

```bash
pnpm add -Dw @changesets/cli@^3
```

2. Initialize changesets in your project:

```bash
pnpm changeset init
```

Every package here is `private`, and v3 skips those by default. Add this to
`.changeset/config.json` or nothing will be versioned or tagged:

```json
"privatePackages": { "version": true, "tag": true }
```

3. Enable the workflow by renaming it:

```bash
mv .github/workflows/version.yml.disabled .github/workflows/version.yml
```

To also build and push images on release, enable `build.yml` the same way and uncomment
the `build` job at the bottom of `version.yml`.

4. Once enabled, the workflow runs on every push to `main`. It will either:
   - Open a **Version Pull Request** that bumps package versions and updates changelogs, or
   - Tag the release if that PR has already been merged, then build and push images.

5. To record a change, run:

```bash
pnpm changeset
```

This will prompt you to select the affected packages and the semver bump type, then create a changeset file. Commit it with your PR.

## Available Scripts

- `pnpm dev`: Start all applications in development mode
- `pnpm dev:server`: Start only the server
- `pnpm dev:tanstack`: Start only the tanstack application
- `pnpm dev:next`: Start only the next application
- `pnpm build`: Build all applications
- `pnpm check`: Run Biome formatting and linting
- `pnpm check:fix`: Fix Biome formatting and linting issues
- `pnpm check:unsafe`: Unsafe fix Biome formatting and linting issues
- `pnpm check:ws`: Run Shering linting
- `pnpm typecheck`: Check TypeScript types across all apps
- `pnpm db:studio`: Open database studio UI
- `pnpm db:push`: Push schema changes to database
- `pnpm db:generate`: Generate database schema changes
- `pnpm db:migrate`: Run database schema migrations
- `pnpm deps:check`: Check for available dependency updates
- `pnpm deps:update`: Update dependencies
