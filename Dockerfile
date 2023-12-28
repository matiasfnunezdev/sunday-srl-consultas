FROM node:18-alpine AS base

ARG NEXT_PUBLIC_FIREBASE_PROJECT_ID
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=$NEXT_PUBLIC_FIREBASE_PROJECT_ID

ARG NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=$NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET

ARG FIREBASE_DATABASE_URL
ENV FIREBASE_DATABASE_URL=$FIREBASE_DATABASE_URL

ARG FIREBASE_PRIVATE_KEY
ENV FIREBASE_PRIVATE_KEY=$FIREBASE_PRIVATE_KEY

ARG FIREBASE_CLIENT_EMAIL
ENV FIREBASE_CLIENT_EMAIL=$FIREBASE_CLIENT_EMAIL

ARG FIREBASE_ENV
ENV FIREBASE_ENV=$FIREBASE_ENV

ARG TWILIO_ACCOUNT_SID
ENV TWILIO_ACCOUNT_SID=$TWILIO_ACCOUNT_SID

ARG TWILIO_AUTH_TOKEN
ENV TWILIO_AUTH_TOKEN=$TWILIO_AUTH_TOKEN

ARG TWILIO_API_KEY
ENV TWILIO_API_KEY=$TWILIO_API_KEY

ARG TWILIO_API_SECRET
ENV TWILIO_API_SECRET=$TWILIO_API_SECRET

ARG TWILIO_CHAT_SERVICE_SID
ENV TWILIO_CHAT_SERVICE_SID=$TWILIO_CHAT_SERVICE_SID

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install turbo --global
COPY . .
RUN turbo prune --scope=web --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app

# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm install turbo --global
RUN npm install

# Build the project
COPY --from=builder /app/out/full/ .
RUN turbo run build --filter=web...

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=installer /app/apps/web/next.config.js .
COPY --from=installer /app/apps/web/package.json .

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

CMD node apps/web/server.js