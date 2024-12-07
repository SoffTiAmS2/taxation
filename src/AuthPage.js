import React, { useState } from 'react';

const AuthPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Здесь можно добавить логику для авторизации
    console.log('Пользователь:', username, 'Пароль:', password);
  };

  return (
    <div>
      <h2>Страница авторизации</h2>
      <form>
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
    </div>
  );
};

export default AuthPage;
