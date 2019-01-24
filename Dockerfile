# Stage 1: build dependencies
FROM node:lts-alpine AS builds

WORKDIR /app

RUN apk add --no-cache python make g++ && \
    npm install -g node-gyp

COPY package*.json ./

RUN npm install --production

# Stage 2: final image
FROM node:lts-alpine

WORKDIR /app

RUN npm install -g pm2

COPY --from=builds /app/node_modules ./node_modules

COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "start", "server.js", "--name=\"twodbros-server\""]
