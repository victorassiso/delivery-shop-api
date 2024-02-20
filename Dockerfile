#----------------------- base ------------------------#
FROM node:20.11.0-bullseye AS base

WORKDIR /app

#----------------------- builder ---------------------#

FROM base AS builder

COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . ./

RUN npm run build

#----------------------- Tests -----------------------#

# FROM builder AS tests
# RUN npm run test

#----------------------- Release ---------------------#

FROM builder AS release

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/prisma ./prisma

USER node

EXPOSE 8080

CMD ["npm", "run", "migrate:prod"]