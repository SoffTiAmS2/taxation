from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Разрешаем запросы с других доменов

# Настройка базы данных SQLite
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///events.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# Модель для хранения событий
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    date = db.Column(db.Date, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    place = db.Column(db.String(100), nullable=False)
    organizer = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)

    def to_dict(self):
        return {
            "title": self.title,
            "date": str(self.date),  # Преобразуем дату в строку для JSON
            "category": self.category,
            "place": self.place,
            "organizer": self.organizer,
            "description": self.description,
        }


# Создание таблиц в базе данных
@app.before_first_request
def create_tables():
    db.create_all()


# Получение всех событий
@app.route('/api/events', methods=['GET'])
def get_events():
    events = Event.query.all()  # Извлекаем все события из базы
    return jsonify([event.to_dict() for event in events])  # Преобразуем в JSON


# Создание нового события
@app.route('/api/events', methods=['POST'])
def create_event():
    data = request.json  # Получаем данные из тела запроса
    new_event = Event(title=data['title'], location=data['location'])  # Создаём новое событие
    db.session.add(new_event)  # Добавляем в базу
    db.session.commit()  # Сохраняем изменения
    return jsonify({"message": "Событие создано", "event": new_event.to_dict()}), 201


# Удаление события
@app.route('/api/events/<int:event_id>', methods=['DELETE'])
def delete_event(event_id):
    event = Event.query.get(event_id)  # Находим событие по ID
    if not event:
        return jsonify({"error": "Событие не найдено"}), 404
    db.session.delete(event)  # Удаляем из базы
    db.session.commit()  # Сохраняем изменения
    return jsonify({"message": f"Событие {event_id} удалено"}), 204


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  # Включаем debug=True