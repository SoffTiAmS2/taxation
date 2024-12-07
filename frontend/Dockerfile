# Используем Node.js 18
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json ./

# Устанавливаем зависимости с обходом конфликтов
RUN npm install --legacy-peer-deps

# Устанавливаем совместимые версии ajv и ajv-keywords
RUN npm install ajv@6 ajv-keywords@3 --save-dev

# Устанавливаем стабильную версию react-scripts
RUN npm install react-scripts@4.0.3 --save-dev

# Копируем весь проект
COPY . .

# Открываем порт 3000
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]