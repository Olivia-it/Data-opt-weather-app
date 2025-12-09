# how to package and run our project, get ing of node, create app, copy j.son to root directory, run all dependencies on package lock
#
FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci 
COPY . . 
ENV PORT = 5001
EXPOSE 5001
CMD ["node", "app.js"]

