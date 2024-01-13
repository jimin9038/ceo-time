FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS builder
WORKDIR /app
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

WORKDIR /app/backend
RUN pnpx prisma generate

WORKDIR /app
RUN pnpm run -r build
RUN pnpm deploy --filter=backend --prod /prod/backend
RUN pnpm deploy --filter=frontend --prod /prod/frontend

FROM base AS backend
COPY --from=builder /prod/backend /prod/backend 
WORKDIR /prod/backend
EXPOSE 8000
CMD ["pnpm", "start"]

FROM base as frontend
COPY --from=builder /prod/frontend /prod/frontend
WORKDIR /prod/frontend
EXPOSE 8001
CMD ["pnpm", "start"]