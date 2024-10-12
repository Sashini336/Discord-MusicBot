FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN cd dashboard && npm install
RUN npm run build
CMD ["npm", "start"]
