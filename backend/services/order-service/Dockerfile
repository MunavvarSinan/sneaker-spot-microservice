FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /order-cart

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile 


COPY . .
RUN pnpm prisma generate

RUN pnpm build

EXPOSE 4001

CMD [ "pnpm", "start" ]
