ARG APP_DIRNAME="tanstack"
ARG APP_PKG_NAME="tanstack"



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                                Node                                                ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM node:24-alpine AS node

# Telemetry environment
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
RUN pnpm turbo prune --scope=$APP_PKG_NAME --docker



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                                Base                                                ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM pnpm AS base
WORKDIR /app

COPY .gitignore .gitignore
COPY .env* .env
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
ENV DOCKER=true
RUN echo "DOCKER=$DOCKER" >> .env

# Node environment
ARG NODE_ENV="production"
ENV NODE_ENV="$NODE_ENV"
RUN echo "NODE_ENV=$NODE_ENV" >> .env

# API
ARG SERVER_URL
RUN if [[ -n "${SERVER_URL+x}" ]]; then \
    echo "SERVER_URL=$SERVER_URL" >> .env; fi

ARG VITE_SERVER_URL
RUN if [[ -n "${VITE_SERVER_URL+x}" ]]; then \
    echo "VITE_SERVER_URL=$VITE_SERVER_URL" >> .env; fi

# TanStack Devtools (optional)
ARG VITE_ROUTER_DEVTOOLS_ENABLED
RUN if [[ -n "${VITE_ROUTER_DEVTOOLS_ENABLED+x}" ]]; then \
    echo "VITE_ROUTER_DEVTOOLS_ENABLED=$VITE_ROUTER_DEVTOOLS_ENABLED" >> .env; fi

ARG VITE_QUERY_DEVTOOLS_ENABLED
RUN if [[ -n "${VITE_QUERY_DEVTOOLS_ENABLED+x}" ]]; then \
    echo "VITE_QUERY_DEVTOOLS_ENABLED=$VITE_QUERY_DEVTOOLS_ENABLED" >> .env; fi



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                               Builder                                              ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM env AS builder
ARG APP_PKG_NAME
WORKDIR /app

COPY --from=pruner /app/out/full .
COPY --from=dev-deps /app .
COPY --from=env /app/.env .env

RUN pnpm run build
RUN find / -type f -name '.env*' -delete



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                               Runner                                               ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM env AS runner
ARG APP_DIRNAME
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nitro
USER nitro

COPY --from=builder --chown=nitro:nodejs /app/apps/$APP_DIRNAME/.output .

ARG PORT=3002
ENV PORT="$PORT"

ENV APP_DIRNAME="$APP_DIRNAME"

ENTRYPOINT PORT=$PORT node server/index.mjs
