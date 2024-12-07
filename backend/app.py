from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Разрешаем запросы с других доменов

@app.route('/api/events', methods=['GET'])
def get_events():
    events = [
        {"id": 1, "title": "sakdjfhasgdfkl;hsdaf", "location": "Красноярск"},
        {"id": 2, "title": "Фестиваль", "location": "Красноярск"}
    ]
    return jsonify(events)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)