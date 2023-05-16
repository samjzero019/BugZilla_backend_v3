FROM node:lts-alpine
ENV NODE_ENV=development
WORKDIR /
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --silent 
COPY . .
EXPOSE 8000
USER node
CMD ["npm", "start"]
