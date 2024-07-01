FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /product

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile 


COPY . .
RUN pnpm prisma generate

RUN pnpm build

EXPOSE 4000

CMD [ "pnpm", "start" ]
