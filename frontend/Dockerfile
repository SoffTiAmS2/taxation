FROM node:18-alpine

WORKDIR /app

# Устанавливаем зависимости, если изменились package.json или package-lock.json
COPY package.json package-lock.json ./
RUN npm install

# Копируем остальной код
COPY . .

EXPOSE 3000

# Запускаем React-приложение с hot-reload
CMD ["npm", "start"]