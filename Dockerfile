# Installs Node.js image
FROM node:16.13.1-alpine3.14

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run dev