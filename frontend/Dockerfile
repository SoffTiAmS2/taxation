# Используем легковесное Node.js окружение
FROM node:18-alpine

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json для установки зависимостей
COPY package.json package-lock.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# Открываем порт для работы React-приложения
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]