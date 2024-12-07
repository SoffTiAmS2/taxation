import React, { useState } from 'react';
import axios from 'axios';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleLogin = async () => {
    try {
      // Отправка данных на сервер
      const response = await axios.post('http://127.0.0.1:5050', {
        Login: username,
        Password: password
      });

      // Если запрос успешный, выводим сообщение об успешной авторизации
      setSuccessMessage(response.data.message);
      setErrorMessage('');
    } catch (error) {
      // В случае ошибки выводим сообщение об ошибке
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Ошибка соединения с сервером');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div>
      <h2>Страница авторизации</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Имя пользователя</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Войти
        </button>
      </form>

      {/* Отображаем ошибки или успех */}
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
    </div>
  );
};

export default AuthPage;
