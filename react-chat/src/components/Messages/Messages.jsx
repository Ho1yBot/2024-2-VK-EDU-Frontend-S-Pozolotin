import React, { useEffect, useRef } from "react";
import styles from "./Messages.module.scss";

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
            {message.text?.startsWith("http") ? (
              <a href={message.text} target="_blank" rel="noopener noreferrer">
                {message.text}
              </a>
            ) : (
              message.text
            )}
          </div>
          {message.voice && (
            <audio controls className={styles["voice-message"]}>
              <source src={message.voice} type="audio/webm" />
              Ваш браузер не поддерживает аудио.
            </audio>
          )}
          {message.files && message.files[0]?.item && (
            <>
              {(message.files[0].item.includes(".png") || message.files[0].item.includes(".jpg")) && (
                <img src={message.files[0].item} alt="Отправленное изображение" className={styles["message-image"]} />
              )}

              <a href={message.files[0].item}>
                {/* Получаем именно название файла из ссылки */}
                {decodeURIComponent(message.files[0].item).split("/").pop()}
              </a>
            </>
          )}
          <div className={styles["message-time"]}>{message.time}</div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;
