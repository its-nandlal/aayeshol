FROM node:20-alpine

WORKDIR /app

# ✅ FULL project copy (important)
COPY . .

RUN npm install -g pnpm

# ✅ install ALL workspace deps (important)
RUN pnpm install --frozen-lockfile

# ✅ Prisma generate (now it will work)
RUN cd apps/api && pnpm exec prisma generate

WORKDIR /app/apps/api

EXPOSE 3001

CMD ["pnpm", "run", "start:dev"]