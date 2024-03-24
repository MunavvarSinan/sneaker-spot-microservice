FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /auth

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile 


COPY . .
RUN pnpm prisma generate

RUN pnpm build

EXPOSE 8091
EXPOSE 5555/tcp

CMD [ "pnpm", "start" ]
