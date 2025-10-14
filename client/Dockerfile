FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files and install deps
COPY package*.json ./
RUN npm ci --legacy-peer-deps

# Copy project files and build Angular app
COPY ./ ./
RUN npm run build -- --configuration=production

# --- Runtime stage using nginx ---
FROM nginx:alpine

# Copy built Angular files
COPY --from=builder /app/dist/client/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
