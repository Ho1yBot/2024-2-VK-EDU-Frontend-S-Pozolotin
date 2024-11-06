// src/components/LoginPage/LoginPage.jsx
import { useState } from 'react';
import { registerUser, loginUser } from '../utils/api';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    console.log('Logging in with:', { username, password }); // Проверка перед запросом
    const result = await loginUser({ username, password });
    console.log('Login Result:', result); // Проверка ответа сервера

    if (result && result.accessToken) {
      console.log('Access token received:', result.accessToken);
    } else {
      console.log('Login failed, no access token received');
    }
  };

  return (
    <div>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
