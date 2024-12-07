FROM python:3.10-slim

WORKDIR /app

# Устанавливаем зависимости, если изменился requirements.txt
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Копируем остальной код
COPY . .

EXPOSE 5000

CMD ["python", "app.py"]