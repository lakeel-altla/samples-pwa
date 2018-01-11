FROM node:alpine

WORKDIR /usr/src/notification

COPY ./src/package*.json ./
RUN npm install

COPY ./src ./

CMD ["node", "index.js"]