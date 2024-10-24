import React from "react";
import "./Message.css";

export function Messages({ messages }) {
  return (
    <div className="messages-container">
      {messages.map((message, index) => (
        <div key={index} className="message-container">
          <div className="message-sender">{message.sender}</div>
          <div className="message-text">{message.text}</div>
          <div className="message-time">{message.time}</div>
          {message.file && (
            <div className="message-file">
              <a href={message.file} download>
                Скачать файл
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
