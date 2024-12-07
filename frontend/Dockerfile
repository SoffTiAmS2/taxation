FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --legacy-peer-deps
RUN npm install react-yandex-maps --force

COPY . .

CMD ["npm", "start"]