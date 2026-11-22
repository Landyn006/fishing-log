FROM node:22-alpine

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY server/package*.json ./server/

WORKDIR /app/server

RUN npm install

COPY server/ ./

EXPOSE 3000

CMD ["npm", "start"]