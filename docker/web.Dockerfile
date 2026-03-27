FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm

# ✅ IMPORTANT FIX (workspace install properly)
RUN pnpm install --no-frozen-lockfile

WORKDIR /app/apps/web

# ✅ ensure dependencies available
RUN pnpm install

ENV NEXT_PUBLIC_API_URL=http://localhost:3001

EXPOSE 3000

CMD ["pnpm", "dev"]