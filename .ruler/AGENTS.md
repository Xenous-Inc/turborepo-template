# Xenous Monorepo Project Rules

This document provides guidelines for AI agents working in this TypeScript monorepo. It covers build/lint/test commands, code style, and project conventions.

## Project Structure

```
.
├── apps/                    # Applications
│   ├── server/             # Backend API (Nitro + H3 + oRPC)
│   ├── tanstack/           # TanStack Start app
│   └── web/                # Next.js app
├── packages/               # Shared packages
│   ├── db/                 # Database schema & client
│   ├── logger/             # Consola‑based logger
│   ├── ui/                 # UI components (shadcn/ui)
│   └── validators/         # Zod validation schemas
├── tooling/                # Shared tooling configurations
│   ├── biome/              # Biome configuration
│   ├── github/             # GitHub Actions setup
│   └── typescript/         # TypeScript base config
└── turbo.json              # Turborepo pipeline
```

## Available Scripts

### Root Scripts (run from repository root)

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all applications in development mode |
| `pnpm dev:server` | Start only the server app |
| `pnpm dev:tanstack` | Start only the tanstack app |
| `pnpm dev:web` | Start only the web app |
| `pnpm build` | Build all applications |
| `pnpm check` | Run Biome formatting and linting across all packages |
| `pnpm check:fix` | Fix Biome formatting and linting issues |
| `pnpm check:unsafe` | Unsafe fix Biome formatting and linting issues |
| `pnpm check:ws` | Run Sherif workspace linting |
| `pnpm typecheck` | Check TypeScript types across all apps |
| `pnpm db:push` | Push schema changes to database |
| `pnpm db:generate` | Generate database schema changes |
| `pnpm db:migrate` | Run database schema migrations |
| `pnpm deps:check` | Check for available dependency updates |
| `pnpm deps:update` | Update dependencies |
| `pnpm rename <name>` | Rename project (changes all occurrences of "xenous") |

### Running Commands for Specific Packages

Use Turbo's filter flag (`-F`) to run commands for a specific package or app:

```bash
# Run dev only for server app
turbo -F server dev

# Run check for a specific package
turbo -F @xenous/db check

# Run typecheck for web app
turbo -F web typecheck
```

### Testing

Currently no test framework is configured. When adding tests, consider using Vitest (preferred) or Jest. Follow existing patterns in the codebase.

### CI Pipeline

The CI workflow (`.github/workflows/ci.yml`) runs:
- `pnpm run ci` (Biome ci)
- `pnpm run check:ws` (workspace consistency)

## Code Style Guidelines

### Formatting & Linting
- **Formatter**: Biome (extends `@xenous/biome-config/base`)
- **Indentation**: 4 spaces (no tabs)
- **Line ending**: LF
- **Line width**: 120 characters
- **Quotes**: Single quotes for JavaScript/TypeScript, single quotes for JSX, preserve for properties
- **Semicolons**: Always
- **Trailing commas**: All (multi‑line)
- **Arrow parentheses**: `asNeeded`

### Import Organization
- Use `import type` for type imports (enforced by Biome's `useImportType` rule)
- Group imports: external packages first, then internal workspace packages, then relative imports
- Use absolute imports within workspace (`@xenous/*`)

### TypeScript
- **Strict mode**: Enabled with `noUncheckedIndexedAccess`
- **Module resolution**: Bundler
- **Module**: `preserve`
- **Verbatim module syntax**: Yes
- **No implicit any**: Off (explicit `any` allowed but discouraged)
- **Enums**: Disallowed (`noEnum: error`)
- **Non‑null assertions**: Disallowed (`noNonNullAssertion: error`)
- **Array type syntax**: Prefer `T[]` over `Array<T>` (Biome `useConsistentArrayType` with `shorthand`)

### Naming Conventions
- **Variables & functions**: `camelCase`
- **Classes & types**: `PascalCase`
- **Constants**: `UPPER_SNAKE_CASE` if truly immutable
- **Files**: `kebab-case` for component files, `camelCase` for utilities
- **CSS classes**: Use Tailwind utility classes; custom classes in `kebab-case`

### Error Handling
- Use `throw new Error()` or domain‑specific error classes (e.g., `ORPCError`)
- Avoid swallowing errors; log unexpected errors with the shared logger (`@xenous/logger`)
- Use `try/catch` for recoverable operations; propagate errors otherwise

### React/UI Components
- Use functional components with TypeScript interfaces for props
- Component names are `PascalCase`
- Use `cn()` utility from `@xenous/ui/lib/utils` for conditional class names
- Prefer Tailwind CSS for styling; follow existing design system (shadcn/ui)
- Use `@tanstack/react-query` for server state management
- Use `pnpm ui-add` to add new shadcn components (available in web and tanstack apps)

### Database & API
- Database schema defined with Drizzle ORM in `packages/db/src/schema`
- Use `@orpc/server` and `@orpc/client` for end‑to‑end type‑safe APIs
- Procedures are defined in `apps/server/src/utils/orpc.ts` (public/protected)
- Environment variables validated with `@t3-oss/env-core` (see `packages/db/env.ts`)

## Workspace Configuration

- **Package manager**: PNPM (version pinned in `packageManager` field)
- **Node version**: ≥24.11 (specified in `.nvmrc` and `engines`)
- **Workspace definition**: `pnpm-workspace.yaml`
- **Dependency catalog**: Centralized in `package.json` `catalog:` imports

## Tooling Configuration Files

- **Biome**: `biome.json` (extends `@xenous/biome-config/base`)
- **TypeScript**: `tsconfig.json` extends `@xenous/typescript/base`
- **Editor**: `.editorconfig` (4‑space indent, LF, trim trailing whitespace)
- **Git hooks**: `.git-hooks/` (configured via `prepare` script)

## Agent‑Specific Notes

- **Always run `pnpm check:fix` after making changes** to ensure code conforms to style.
- **Use Turbo filters** to run commands only on affected packages.
- **When adding new packages**, run `pnpm turbo gen init` to generate boilerplate.
- **Never commit secrets** (`.env`, `.env.local`); they are git‑ignored.
- **Follow existing patterns** in the codebase for consistency.

---

*Last updated: January 2025*
