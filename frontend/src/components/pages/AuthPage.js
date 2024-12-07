import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import './AuthPage.css';

const AuthPage = ({ onLoginSuccess }) => (
  <div className="auth-page">
    <h2>Авторизация</h2>
    <LoginForm onLoginSuccess={onLoginSuccess} />
  </div>
);

export default AuthPage;