FROM node:8.16.0-alpine
WORKDIR /home/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build