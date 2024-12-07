import React, { useState } from 'react';
import axios from 'axios';
import './AuthPage.css'; // Подключение стилей

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Для отображения ошибок

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://127.0.0.1:5000', {
        login: username,
        password: password,
      });

      // Обрабатываем ответ
      const userId = response.data.UserID;
      console.log('UserID:', userId);
      alert(`Вы успешно авторизовались! Ваш UserID: ${userId}`);
    } catch (err) {
      console.error('Ошибка авторизации:', err);
      setError('Неверное имя пользователя или пароль');
    }
  };

  return (
    <div className="auth-container">
      <h2>Вход в аккаунт</h2>
      <form className="auth-form">
        <div className="form-group">
          <label>Логин</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Введите логин"
          />
        </div>
        <div className="form-group">
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Введите пароль"
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="button" onClick={handleLogin} className="login-button">
          Войти
        </button>
      </form>
    </div>
  );
};

export default AuthPage;
