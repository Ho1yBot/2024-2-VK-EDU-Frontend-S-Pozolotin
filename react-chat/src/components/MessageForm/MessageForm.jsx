import React, { useState } from "react";
import { saveMessage } from "../Storage/Storage";
import AttachFile from "../AttachFile/AttachFile";
import styles from "./MessageForm.module.scss";
import SendIcon from '@mui/icons-material/Send';

export function MessageForm({ chatId, messageSend }) {
  const [messageText, setMessageText] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);

  const sendMessage = (text, file) => {
    const message = {
      text: text || "",
      sender: "Вы",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      file: file || null,
    };

    saveMessage(chatId, message);
    messageSend(message);

    setMessageText("");
    setAttachedFile(null);
  };

  // Отправка сообщения при отправке формы
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!messageText && !attachedFile) return;

    if (attachedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(attachedFile);
      reader.onload = () => {
        const fileContent = reader.result;
        const isImage = attachedFile.type.startsWith("image/");

        // Проверка, является ли файл изображением или обычным файлом
        sendMessage(
          messageText,
          isImage ? { type: "image", content: fileContent } : { type: "file", content: fileContent, name: attachedFile.name }
        );
      };
    } else {
      sendMessage(messageText);
    }
  };

  // Обработка выбора файла
  const handleFileSelect = (file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const fileContent = reader.result;
      const isImage = file.type.startsWith("image/");

      // Отправка файла сразу в чат
      sendMessage(
        "",
        isImage ? { type: "image", content: fileContent, name: file.name } : { type: "file", content: fileContent, name: file.name }
      );
    };

    setAttachedFile(null);
  };

  // Обработка нажатия Enter для отправки сообщения
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles["form-input"]}
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Введите сообщение"
      />
      {attachedFile && (
        <div className={styles["attached-file-info"]}>
          Файл: {attachedFile.name} прикреплен
        </div>
      )}
      <div className={styles["form-buttons"]}>
        <AttachFile fileSelect={handleFileSelect} />
        <button type="submit" className={styles["send-button"]}>
          <SendIcon sx={{color: "#8e24aa"}} />
        </button>
      </div>
    </form>
  );
}

export default MessageForm;
