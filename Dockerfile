# Base image with Node 20
FROM node:20-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

# ---- Dependencies ----
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---- Build ----
FROM base AS build
COPY . .
COPY --from=deps /app/node_modules ./node_modules

# Public env var for the client bundle is baked in at build time.
# Empty means the browser calls same-origin paths (/summarize, /analyse),
# which the Next.js server proxies to the API via rewrites (next.config.ts).
ARG NEXT_PUBLIC_API_URL=
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Server-side target for the /summarize and /analyse rewrites.
# Inside the Docker network this resolves to the api compose service.
ARG API_BASE_URL=http://api:8000
ENV API_BASE_URL=$API_BASE_URL

RUN npm run build

# ---- Runtime (self-contained standalone server, no nginx) ----
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# Make the proxy target available to the running server too, so it can be
# overridden at runtime (e.g. docker compose env).
ARG API_BASE_URL=http://api:8000
ENV API_BASE_URL=$API_BASE_URL

RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

# public and .next/static are served directly by the standalone server
COPY --from=build --chown=nextjs:nodejs /app/public ./public
COPY --from=build --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=build --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]