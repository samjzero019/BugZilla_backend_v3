FROM node:lts-alpine

ENV NODE_ENV = development

WORKDIR /

COPY ["package.json", "package-lock.json", "./"] 

RUN npm install

COPY . .

EXPOSE 8003

CMD ["npm", "start"]

