FROM node:current-alpine3.14

WORKDIR /app

COPY . .

EXPOSE 8000

RUN npm install

CMD [ "npm", "start" ]