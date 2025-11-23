# --- Base image ---
FROM node:25-alpine AS base

# --- Dependencies stage ---
FROM base AS deps
WORKDIR /app

# Install dependencies based on the lock file
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm install

# --- Build stage ---
FROM base AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build for production
RUN npm run build

# --- Production runtime ---
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV DEEPSEeK_API_KEY=""

# Next.js server uses port 3000 by default
EXPOSE 3000

# Copy only necessary output
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

CMD ["npm", "start"]

