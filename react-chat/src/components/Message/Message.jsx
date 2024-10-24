import React, { useState } from "react";
import { saveMessage } from "./../Storage/Storage";
import "./Message.css";
import AttachFile from "./../AttachFile/AttachFile";

export function MessageForm({ chatId, onMessageSend }) {
  const [messageText, setMessageText] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!messageText && !attachedFile) return; // Если нет текста и файла, не отправляем

    if (attachedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(attachedFile);
      reader.onload = () => {
        const message = {
          text: messageText || "",
          sender: "Вы",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          file: reader.result,
        };

        saveMessage(chatId, message);
        onMessageSend(message); // Передаем сообщение родителю

        // Сброс полей
        setMessageText("");
        setAttachedFile(null);
      };
    } else {
      const message = {
        text: messageText,
        sender: "Вы",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        file: null,
      };

      saveMessage(chatId, message);
      onMessageSend(message);

      // Сброс полей
      setMessageText("");
    }
  };

  const handleFileSelect = (file) => {
    setAttachedFile(file);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <textarea
        className="form-input"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Введите сообщение"
      />
      {attachedFile && (
        <div className="attached-file-info">
          Файл: {attachedFile.name} прикреплен
        </div>
      )}
      <div className="form-buttons">
        {/* Компонент AttachFile рядом с кнопкой отправки */}
        <AttachFile onFileSelect={handleFileSelect} />

        <button type="submit" className="send-button">
          <img src="./images/send-icon.svg" alt="Отправить сообщение" />
        </button>
      </div>
    </form>
  );
}

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
