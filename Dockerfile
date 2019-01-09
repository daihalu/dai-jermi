FROM node:lts

RUN mkdir /home/node/tdb-server && chown -R node:node /home/node/tdb-server

WORKDIR /home/node/tdb-server

COPY package*.json ./

RUN npm install

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 3000

CMD ["node", "server.js"]
