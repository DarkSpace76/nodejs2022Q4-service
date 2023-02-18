FROM --platform=linux/amd64 node:18.14-alpine

WORKDIR usr/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]