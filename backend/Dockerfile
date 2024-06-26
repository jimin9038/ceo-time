# [NOTE] Build image from the root directory of this repository.
# ex) `docker build -f apps/backend/Dockerfile .`

### BUILDER ###
ARG target=client

FROM node:20-alpine AS builder
ARG target

COPY . /build
WORKDIR /build

RUN corepack enable
RUN pnpm --filter="@ceotime/backend" deploy out

WORKDIR /build/out
RUN npx prisma generate
RUN npm run build ${target}

### PRODUCTION ###
FROM node:20-alpine
ARG target

ENV NODE_ENV=production
ENV TARGET=${target}

COPY --from=builder /build/out /app
COPY ./backend/entrypoint.sh /app/entrypoint.sh
WORKDIR /app

EXPOSE 4001
ENTRYPOINT ["/app/entrypoint.sh"]
