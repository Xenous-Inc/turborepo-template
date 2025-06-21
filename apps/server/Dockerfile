ARG APP_DIRNAME="server"
ARG APP_PKG_NAME="@xenous/server"



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                                Node                                                ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM node:22-alpine AS node

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
ENV PATH="$PNPM_HOME:$PATH"

# Download PNPM
RUN corepack enable



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                               Pruner                                               ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM pnpm AS pruner
ARG APP_PKG_NAME
WORKDIR /app

# Download Turborepo
RUN pnpm add -g turbo@^2

# Prune
COPY . .
RUN turbo prune --scope=$APP_PKG_NAME --docker



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                                Base                                                ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM pnpm AS base
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .



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
##                                                 Env                                                ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM base AS env
WORKDIR /app

# Remote Cache
ARG TURBO_TEAM
ENV TURBO_TEAM="$TURBO_TEAM"

ARG TURBO_TOKEN
ENV TURBO_TOKEN="$TURBO_TOKEN"

# Docker
RUN echo "DOCKER=true" > .env

# Node environment
ARG NODE_ENV="production"
RUN echo "NODE_ENV=$NODE_ENV" >> .env

# Database
ARG DATABASE_URL
RUN echo "DATABASE_URL=$DATABASE_URL" >> .env

# Auth
ARG BETTER_AUTH_SECRET
RUN echo "BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET" >> .env

ARG BETTER_AUTH_URL
RUN echo "BETTER_AUTH_URL=$BETTER_AUTH_URL" >> .env

# Cors
ARG CORS_ORIGIN
RUN echo "CORS_ORIGIN=$CORS_ORIGIN" >> .env



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                            Builder                                           ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM env AS builder
ARG APP_PKG_NAME
WORKDIR /app

COPY --from=pruner /app/out/full/ .
COPY --from=dev-deps /app/ .

RUN pnpm run build



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                            Runner                                            ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM node AS runner
ARG APP_DIRNAME
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono
USER hono

COPY --from=production-deps --chown=hono:nodejs /app/node_modules ./node_modules
COPY --from=production-deps --chown=hono:nodejs /app/apps/$APP_DIRNAME/node_modules ./apps/$APP_DIRNAME/node_modules
COPY --from=builder --chown=hono:nodejs /app/apps/$APP_DIRNAME/dist/src ./apps/$APP_DIRNAME

ARG PORT=3001
ENV PORT="$PORT"

ENV APP_DIRNAME="$APP_DIRNAME"

ENTRYPOINT PORT=$PORT node apps/$APP_DIRNAME/index.js
