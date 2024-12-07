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
    id = db.Column(db.Integer, primary_key=True)  # Уникальный ID
    title = db.Column(db.String(100), nullable=False)  # Название события
    location = db.Column(db.String(100), nullable=False)  # Местоположение

    def to_dict(self):
        """Преобразует объект в словарь для JSON-ответов."""
        return {
            "id": self.id,
            "title": self.title,
            "location": self.location
        }


# Создание таблиц при первом запуске
with app.app_context():
    db.create_all()


# Получение всех событий
@app.route('/api/events', methods=['GET'])
def get_events():
    events = Event.query.all()
    return jsonify([event.to_dict() for event in events])

# Создание нового события
@app.route('/api/events', methods=['POST'])
def create_event():
    data = request.json
    new_event = Event(title=data['title'], location=data['location'])
    db.session.add(new_event)
    db.session.commit()
    return jsonify({"message": "Событие создано", "event": new_event.to_dict()}), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)