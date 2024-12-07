from flask import Flask, jsonify, request
import sqlite3
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Разрешаем запросы с других доменов

# Путь к базе данных
DATABASE = 'events.db'

# Функция для подключения к базе данных
def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row  # Возвращаем строки как словари
    return conn

# Создание таблиц в базе данных (если они еще не созданы)
def init_db():
    conn = get_db()
    cursor = conn.cursor()

    # Включение поддержки внешних ключей
    cursor.execute('PRAGMA foreign_keys = ON;')

    # Создание таблиц
# Создание таблиц
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS User (
        UserID INTEGER PRIMARY KEY AUTOINCREMENT,
        Login TEXT NOT NULL,
        Password TEXT NOT NULL,
        Role TEXT CHECK(Role IN ('user', 'admin', 'organizer'))
    );
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Event (
        EventID INTEGER PRIMARY KEY AUTOINCREMENT,
        Title TEXT NOT NULL,
        Format TEXT,
        Place TEXT,
        Date DATETIME,
        Manager INTEGER,
        Resources_link TEXT,
        Price REAL,
        Age_limit INTEGER,
        Description TEXT,
        FOREIGN KEY (Manager) REFERENCES User(UserID)
    );
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Feedback (
        FeedbackID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserID INTEGER,
        EventID INTEGER,
        Rating INTEGER CHECK(Rating BETWEEN 1 AND 5),
        Description TEXT,
        Created_at DATETIME,
        FOREIGN KEY (UserID) REFERENCES User(UserID),
        FOREIGN KEY (EventID) REFERENCES Event(EventID)
    );
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Notification (
        NotificationID INTEGER PRIMARY KEY AUTOINCREMENT,
        UserID INTEGER,
        Description TEXT,
        Read_status TEXT CHECK(Read_status IN ('unread', 'read')),
        Created_at DATETIME,
        FOREIGN KEY (UserID) REFERENCES User(UserID)
    );
    ''')


    conn.commit()
    conn.close()

# Вызовем функцию для создания таблиц при запуске приложения
init_db()

# Получение всех событий
@app.route('/api/events', methods=['GET'])
def get_events():
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM Event")
    events = cursor.fetchall()
    conn.close()

    # Преобразуем строки в список словарей
    return jsonify([dict(event) for event in events])

# Авторизация пользователя
@app.route('/api/login', methods=['POST'])
def login_user():
    data = request.json
    login = data.get('login')
    password = data.get('password')

    if not login or not password:
        return jsonify({"message": "Логин и пароль обязательны"}), 400

    conn = get_db()
    cursor = conn.cursor()

    # Ищем пользователя по логину
    cursor.execute("SELECT * FROM User WHERE Login = ?", (login,))
    user = cursor.fetchone()

    if not user:
        conn.close()
        return jsonify({"message": "Пользователь с таким логином не найден"}), 404

    # Сравниваем пароли
    if user['Password'] != password:
        conn.close()
        return jsonify({"message": "Неверный пароль"}), 401

    conn.close()

    # Возвращаем UserID и роль пользователя
    return jsonify({
        "UserID": user['UserID'],
        "Role": user['Role'],
        "message": "Успешная авторизация"
    }), 200

# Регистрация нового пользователя
@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.json
    login = data.get('Login')
    password = data.get('Password')
    role = data.get('Role', 'user')  # По умолчанию роль - user

    if not login or not password:
        return jsonify({"message": "Логин и пароль обязательны"}), 400

    conn = get_db()
    cursor = conn.cursor()

    # Проверяем, существует ли пользователь с таким логином
    cursor.execute("SELECT * FROM User WHERE Login = ?", (login,))
    existing_user = cursor.fetchone()

    if existing_user:
        conn.close()
        return jsonify({"message": "Пользователь с таким логином уже существует"}), 409

    # Создаем нового пользователя
    cursor.execute('''
        INSERT INTO User (Login, Password, Role)
        VALUES (?, ?, ?)
    ''', (login, password, role))

    conn.commit()
    user_id = cursor.lastrowid
    conn.close()

    return jsonify({"message": "Пользователь успешно зарегистрирован", "user_id": user_id}), 201

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
