FROM node:20 AS builder

WORKDIR /app

COPY . .

RUN npm i -g pnpm

RUN pnpm install

RUN pnpm --filter backend build

FROM node:20-alpine AS production

WORKDIR /app

COPY . .

RUN npm i -g pnpm

ENV NODE_ENV production

COPY --from=builder /app ./