// components/Message/Message.jsx
import React, { useEffect, useRef } from "react";
import styles from "./Message.module.scss";

export function Messages({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles['messages-container']}>
      {messages.map((message, index) => (
        <div key={index} className={styles['message-container']}>
          <div className={styles['message-sender']}>{message.sender}</div>
          <div className={styles['message-text']}>{message.text}</div>
          <div className={styles['message-time']}>{message.time}</div>
          {message.file && (
            <div className={styles['message-file']}>
              <a href={message.file} download>
                Скачать файл
              </a>
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;
