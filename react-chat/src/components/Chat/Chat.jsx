// components/Chat.jsx
import React, { useState, useEffect } from 'react';
import { loadMessages, saveMessage, clearAllLocalStorage } from './../Storage/Storage';

const Chat = () => {
  const [messages, setMessages] = useState([]);

  // Загружаем сообщения при первом рендере
  useEffect(() => {
    const loadedMessages = loadMessages();
    setMessages(loadedMessages);
  }, []);

  // Функция для добавления нового сообщения
  const handleSubmit = (e) => {
    e.preventDefault();
    const message = e.target.messageInput.value;
    if (message) {
      saveMessage(message);
      setMessages([...messages, message]);
      e.target.messageInput.value = '';
    }
  };

  // Функция для очистки сообщений
  const handleClear = () => {
    clearAllLocalStorage();
    setMessages([]);
  };

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input name="messageInput" placeholder="Enter your message" />
        <button type="submit">Send</button>
      </form>
      <button onClick={handleClear}>Clear Messages</button>
    </div>
  );
};

export default Chat;
