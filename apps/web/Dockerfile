ARG APP_DIRNAME="web"
ARG APP_PKG_NAME="@xenous/web"



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                                      Node                                                      ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM node:22-alpine AS node

# Telemetry environment
ENV NEXT_TELEMETRY_DISABLED=true
ENV TURBO_TELEMETRY_DISABLED=true



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                                      PNPM                                                      ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM node AS pnpm

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk update
RUN apk add --no-cache libc6-compat

# PNPM environment
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Download PNPM
RUN npm install -g corepack@latest
RUN corepack enable



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                                     Pruner                                                     ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM pnpm AS pruner
ARG APP_PKG_NAME
WORKDIR /app

# Download Turborepo
RUN pnpm add -g turbo@^2

# Prune
COPY . .
RUN turbo prune --scope=$APP_PKG_NAME --docker
RUN find . -name "node_modules" -type d -prune -exec rm -rf '{}' +



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                                      Base                                                      ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM pnpm AS base
WORKDIR /app

COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=pruner /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                             Development dependencies                                           ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM base AS dev-deps
WORKDIR /app

RUN pnpm install --frozen-lockfile



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                             Production dependencies                                            ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM base AS production-deps
WORKDIR /app

RUN pnpm install --prod --frozen-lockfile



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                                       Env                                                      ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



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

# API
ARG VITE_API_BASE_URL
RUN if [[ -v NEXT_PUBLIC_SERVER_URL ]]; then echo "NEXT_PUBLIC_SERVER_URL=$NEXT_PUBLIC_SERVER_URL" >> .env; fi

# Next Devtools (optional)
ARG NEXT_PUBLIC_NEXT_DEVTOOLS_ENABLED
RUN if [[ -v NEXT_PUBLIC_NEXT_DEVTOOLS_ENABLED ]]; then echo "NEXT_PUBLIC_NEXT_DEVTOOLS_ENABLED=$NEXT_PUBLIC_NEXT_DEVTOOLS_ENABLED" >> .env; fi

# TanStack Query Devtools (optional)
ARG NEXT_PUBLIC_QUERY_DEVTOOLS_ENABLED
RUN if [[ -v NEXT_PUBLIC_QUERY_DEVTOOLS_ENABLED ]]; then echo "NEXT_PUBLIC_QUERY_DEVTOOLS_ENABLED=$NEXT_PUBLIC_QUERY_DEVTOOLS_ENABLED" >> .env; fi



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                                     Builder                                                    ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM env AS builder
ARG APP_PKG_NAME
WORKDIR /app

COPY --from=pruner /app/out/full/ .
COPY --from=dev-deps /app/ .
COPY turbo.json turbo.json

RUN pnpm run build --filter=$APP_PKG_NAME...
RUN rm -rf ./**/*/src



## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##
##                                                     Runner                                                     ##
## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ## ##



FROM node AS runner
ARG APP_DIRNAME
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/apps/$APP_DIRNAME/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/$APP_DIRNAME/.next/static ./apps/$APP_DIRNAME/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/$APP_DIRNAME/public ./apps/$APP_DIRNAME/public
# COPY --from=builder --chown=nextjs:nodejs /app/.env ./.env

ARG PORT=3001
ENV PORT="$PORT"

ENV APP_DIRNAME="$APP_DIRNAME"

ENTRYPOINT PORT=$PORT node apps/$APP_DIRNAME/server.js
