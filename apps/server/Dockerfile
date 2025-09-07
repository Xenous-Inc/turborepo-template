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

# Database
ARG DATABASE_URL
RUN if [[ -n "${DATABASE_URL+x}" ]]; then \
        echo "DATABASE_URL=$DATABASE_URL" >> .env; fi

# Auth
ARG BETTER_AUTH_SECRET
RUN if [[ -n "${BETTER_AUTH_SECRET+x}" ]]; then \
        echo "BETTER_AUTH_SECRET=$BETTER_AUTH_SECRET" >> .env; fi

ARG BETTER_AUTH_URL
RUN if [[ -n "${BETTER_AUTH_URL+x}" ]]; then \
        echo "BETTER_AUTH_URL=$BETTER_AUTH_URL" >> .env; fi

# Cors
ARG CORS_ORIGIN
RUN if [[ -n "${CORS_ORIGIN+x}" ]]; then \
        echo "CORS_ORIGIN=$CORS_ORIGIN" >> .env; fi



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

ARG PORT=3000
ENV PORT="$PORT"

ENV APP_DIRNAME="$APP_DIRNAME"

ENTRYPOINT PORT=$PORT node server/index.mjs
