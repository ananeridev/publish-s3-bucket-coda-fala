FROM node:16-slim

WORKDIR /src

COPY package.json package-lock.json /src/

RUN npm ci --silient

COPY . .

CMD npm start