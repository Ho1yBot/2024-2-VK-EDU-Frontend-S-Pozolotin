import React, { useState } from "react";
import { saveMessage } from "./../Storage/Storage";
import "./../Message/Message.css";
import AttachFile from "./../AttachFile/AttachFile";
import "./MessageForm.css"

export function MessageForm({ chatId, onMessageSend }) {
  const [messageText, setMessageText] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!messageText && !attachedFile) return;

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
        onMessageSend(message);

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
        <AttachFile onFileSelect={handleFileSelect} />
        <button type="submit" className="send-button">
          <img src="./images/send-icon.svg" alt="Отправить сообщение" />
        </button>
      </div>
    </form>
  );
}

export default MessageForm;
