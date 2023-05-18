FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install 
COPY . .
EXPOSE 8002
CMD ["npm", "start"]
