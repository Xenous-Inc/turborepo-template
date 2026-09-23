# syntax=docker/dockerfile:1

# varlock resolves the env graph at container start, so the runner needs the CLI.
# Keep this in sync with the `varlock` catalog entry in pnpm-workspace.yaml.
FROM ghcr.io/dmno-dev/varlock:1.18.0 AS varlock

ARG APP_DIRNAME="next"
ARG APP_PKG_NAME="next"



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                                Node                                                ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM node:24-alpine AS node

# Telemetry environment
ENV NEXT_TELEMETRY_DISABLED=true
ENV TURBO_TELEMETRY_DISABLED=true



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                                PNPM                                                ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM node AS pnpm

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
# to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat

# PNPM environment
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PNPM_HOME:$PATH"

# Download PNPM
RUN corepack enable



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                               Pruner                                               ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM pnpm AS pruner
ARG APP_PKG_NAME
WORKDIR /app

# Pin pnpm to the version declared in root package.json (packageManager field)
# before any pnpm invocation, so corepack downloads the correct release.
COPY package.json package.json

# Download Turborepo
RUN pnpm add -g turbo@^2

# Prune
COPY . .
RUN pnpm turbo prune --scope=$APP_PKG_NAME --docker



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                                Base                                                ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM pnpm AS base
WORKDIR /app

COPY .gitignore .gitignore
# Root varlock schema. `turbo prune` keeps package-level .env.schema files but not this one,
# and every app schema imports it via `@import(../../)`.
COPY .env.schema .env.schema
COPY --from=pruner /app/out/json .



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                       Development dependencies                                     ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM base AS dev-deps
WORKDIR /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                       Production dependencies                                      ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM base AS production-deps
WORKDIR /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                               Builder                                              ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM base AS builder
ARG APP_PKG_NAME
WORKDIR /app

COPY --from=pruner /app/out/full .
COPY --from=dev-deps /app .

# Baked onto the image because the runtime needs them too - secret mounts do not persist.
ENV DOCKER=true
ARG NODE_ENV="production"
ENV NODE_ENV="$NODE_ENV"

# Env values arrive as build secrets, so they never land in a layer. Every mount is
# optional (`required` defaults to false), which lets one Dockerfile serve all three
# suppliers: the `*_env` file mounts for local compose, the per-variable `env=` mounts
# for Coolify build secrets and GitHub Actions. Process env wins over the mounted file.
RUN \
    --mount=type=secret,id=next_env,target=/app/apps/next/.env \
    --mount=type=secret,id=SERVER_URL,env=SERVER_URL \
    --mount=type=secret,id=NEXT_PUBLIC_SERVER_URL,env=NEXT_PUBLIC_SERVER_URL \
    --mount=type=secret,id=NEXT_PUBLIC_NEXT_DEVTOOLS_ENABLED,env=NEXT_PUBLIC_NEXT_DEVTOOLS_ENABLED \
    --mount=type=secret,id=NEXT_PUBLIC_QUERY_DEVTOOLS_ENABLED,env=NEXT_PUBLIC_QUERY_DEVTOOLS_ENABLED \
    --mount=type=secret,id=TURBO_TEAM,env=TURBO_TEAM \
    --mount=type=secret,id=TURBO_TOKEN,env=TURBO_TOKEN \
    pnpm run build

# Collapse the @import graph into a self-contained dir the runner can load.
# Purely structural - no values are resolved, so no secrets are involved.
RUN cd apps/next && pnpm exec varlock flatten --out-dir /app/.env-flat



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                               Runner                                               ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM base AS runner
ARG APP_DIRNAME
WORKDIR /app

ENV DOCKER=true
ARG NODE_ENV="production"
ENV NODE_ENV="$NODE_ENV"

COPY --from=varlock /usr/local/bin/varlock /usr/local/bin/varlock
COPY --from=builder /app/.env-flat ./.env-flat

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/app/api-reference/config/next-config-js/output#automatically-copying-traced-files
COPY --from=builder --chown=nextjs:nodejs /app/apps/$APP_DIRNAME/.next/standalone .
COPY --from=builder --chown=nextjs:nodejs /app/apps/$APP_DIRNAME/.next/static ./apps/$APP_DIRNAME/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/$APP_DIRNAME/public ./apps/$APP_DIRNAME/public

ARG PORT=3001
ENV PORT="$PORT"

ENV APP_DIRNAME="$APP_DIRNAME"

ENTRYPOINT PORT=$PORT varlock run -p ./.env-flat/ -- node apps/$APP_DIRNAME/server.js
