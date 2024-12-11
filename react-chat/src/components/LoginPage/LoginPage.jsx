// src/components/LoginPage/LoginPage.jsx
import React, { useState } from 'react';
import { registerUser, loginUser } from './../../utils/api';
import styles from './LoginPage.module.scss'


export const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLogin = async () => {
    console.log('Logging in with:', { username, password });
    const result = await loginUser({ username, password });
    console.log('Login Result:', result);

    if (result && result.access) {
      console.log('Access token received:', result.access);
      onLoginSuccess(); // Уведомляем родительский компонент об успешной авторизации
    } else {
      console.log('Login failed, no access token received');
    }
  };
  const toggleRegister = () => {
    setIsRegisterOpen(!isRegisterOpen);
  }

  return (
    <div className={styles["login-container"]}>
      <h2 className={styles['login-title']}>Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
      <div className={styles["login-to-reg"]}>
        <p>Ещё не зарегистрирован? Жми на </p>
        <button onClick={toggleRegister}>Зарегистрироваться</button>
      </div>
      {isRegisterOpen && <RegisterPage />}
    </div>
  );
};

export const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(null);

  const handleRegister = async () => {
    console.log('Registering with:', { username, password, firstName, lastName, bio, avatar });
    const result = await registerUser({ username, password, first_name: firstName, last_name: lastName, bio, avatar });
    console.log('Registration Result:', result);

    if (result && result.id) {
      console.log('Registration successful, user ID:', result.id);
      localStorage.setItem("Reg-ID", result.id)
    } else {
      console.log('Registration failed');
    }
  };

  return (
    <div className={styles["reg-container"]}>
      <h2 className={styles['login-title']}>Register</h2>
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
        <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
        <input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" />
        <input type="file" onChange={(e) => setAvatar(e.target.files[0])} placeholder="Avatar" />
        <button onClick={handleRegister}>Register</button>
    </div>
  )
}