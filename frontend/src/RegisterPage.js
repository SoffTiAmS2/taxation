import React, { useState } from 'react';
import axios from 'axios';
import './RegisterPage.css';

const RegisterPage = ({ onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5050/api/register', {
        Login: username,
        Password: password,
        Role: 'user', // По умолчанию роль user
      });

      alert(response.data.message);
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
          <label>Подтвердите пароль</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Введите пароль еще раз"
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="button" onClick={handleRegister} className="register-button">
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;