FROM node:20-alpine AS builder

WORKDIR /app

# Copy server package and tsconfig
COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci

# Copy source and build
COPY src ./src
RUN npm run build

# --- Runtime image ---
FROM node:20-alpine

WORKDIR /app

# Copy built output from builder
COPY --from=builder /app/dist ./dist
COPY package*.json ./

RUN npm ci --omit=dev

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001
RUN mkdir -p /app/uploads && chown -R 1001:1001 /app
USER nodejs

EXPOSE 3000
CMD ["node", "dist/src/index.js"]
