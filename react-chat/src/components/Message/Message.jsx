import React, { useEffect, useRef, useState } from "react";
import styles from "./Message.module.scss";

export function Messages({ messages }) {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className={styles["messages-container"]}>
      {messages.map((message, index) => (
        <div key={index} className={styles["message-container"]}>
          <div className={styles["message-sender"]}>{`${message.sender.first_name} ${message.sender.last_name}`}</div>
          <div className={styles["message-text"]}>
            {message.text.startsWith("http") ? (
              <a href={message.text} target="_blank" rel="noopener noreferrer">
                {message.text}
              </a>
            ) : (
              message.text
            )}
          </div>
          {message.file && message.file.type === "image" && (
            <img
              src={message.file.content}
              alt="Отправленное изображение"
              className={styles["message-image"]}
            />
          )}
          <div className={styles["message-time"]}>{message.time}</div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;
