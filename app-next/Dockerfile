FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

RUN npm prune --production

FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S app && adduser -S app -G app

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
USER app

CMD ["npm", "run", "start"]
