# Multi-stage build for production optimization
FROM node:18-alpine AS base
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy package files
COPY package.json pnpm-lock.yaml ./
COPY shared ./shared

# Development stage
FROM base AS development
RUN pnpm install --frozen-lockfile
COPY . .
EXPOSE 5173
CMD ["pnpm", "dev"]

# Build stage
FROM base AS build
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app

# Install production dependencies
RUN npm install -g pnpm
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy built application
COPY --from=build /app/dist ./dist
COPY --from=build /app/shared ./shared

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S buildpro -u 1001
USER buildpro

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

EXPOSE 3000
CMD ["node", "dist/server/node-build.mjs"]

# Security scanning stage
FROM build AS security-scan
RUN pnpm audit --audit-level moderate
RUN npm install -g snyk
RUN snyk test

# Testing stage
FROM build AS test
RUN pnpm test:unit
RUN pnpm test:integration
