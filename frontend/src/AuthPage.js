import React, { useState } from 'react';
import axios from 'axios';
import './AuthPage.css';

<<<<<<< HEAD
const AuthPage = ({ onLoginSuccess }) => {
=======
const AuthPage = ({ onLoginSuccess, switchToRegister }) => {
>>>>>>> stas6
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Логин и пароль обязательны');
      return;
    }

    try {
<<<<<<< HEAD
      // Отправка POST-запроса на API авторизации
      const response = await axios.post('http://127.0.0.1:5050/api/login', {
        login: username,
        password: password,
      });

      // Успешная авторизация
      const { UserID, Role, message } = response.data;
      console.log('Авторизация успешна:', { UserID, Role });
      alert(`Добро пожаловать! Ваша роль: ${Role}`);
      
      // Вызываем callback для уведомления об успешной авторизации
=======
      setError(null);

      const response = await axios.post('http://127.0.0.1:5050/api/login', {
        login: username.trim(),
        password: password.trim(),
      });

      const { UserID, Role } = response.data;
      alert(`Добро пожаловать! Ваша роль: ${Role}`);

>>>>>>> stas6
      if (onLoginSuccess) onLoginSuccess({ UserID, Role });
    } catch (err) {
      // Обработка ошибок
      console.error('Ошибка авторизации:', err);
      if (err.response) {
        setError(err.response.data.message || 'Ошибка сервера');
      } else {
        setError('Не удалось подключиться к серверу');
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Вход в аккаунт</h2>
      <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
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
        <p>
          Нет аккаунта?{' '}
          <span className="link" onClick={switchToRegister}>
            Зарегистрируйтесь
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;