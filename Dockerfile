# syntax=docker/dockerfile:1.0.0-experimental

FROM node:18.1.0-alpine3.15 as builder

WORKDIR /app

COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm store add $(yq -M  eval '.packages | keys' pnpm-lock.yaml | sed 's/- \///g' | sed -r 's/\/([^_/]+)(_[^_]+)?$/@\1/g')

COPY . .

RUN pnpm i

RUN pnpm run build

FROM node:lts-alpine3.15

WORKDIR /app

RUN npm install -g pnpm

COPY --from=builder /app  .

ENV HOST 0.0.0.0
ENV NODE_ENV production

EXPOSE 3000

CMD ["pnpm", "run", "start"]
