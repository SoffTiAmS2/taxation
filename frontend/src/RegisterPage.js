import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage = ({ onRegisterSuccess, switchToLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (!username || !password) {
      setError('Логин и пароль обязательны');
      return;
    }

    try {
      setError(null);

      const response = await axios.post('http://127.0.0.1:5050/api/register', {
        login: username.trim(),
        password: password.trim(),
        role,
      });

      alert('Регистрация прошла успешно!');
      if (onRegisterSuccess) onRegisterSuccess();
    } catch (err) {
      console.error('Ошибка регистрации:', err);
      if (err.response) {
        setError(err.response.data.message || 'Ошибка сервера');
      } else {
        setError('Не удалось подключиться к серверу');
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Регистрация</h2>
      <form className="register-form" onSubmit={(e) => e.preventDefault()}>
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
        <div className="form-group">
          <label>Роль</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">Пользователь</option>
            <option value="admin">Администратор</option>
            <option value="organizer">Организатор</option>
          </select>
        </div>
        {error && <div className="error">{error}</div>}
        <button type="button" onClick={handleRegister} className="register-button">
          Зарегистрироваться
        </button>
        <p>
          Уже есть аккаунт?{' '}
          <span className="link" onClick={switchToLogin}>
            Войти
          </span>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;