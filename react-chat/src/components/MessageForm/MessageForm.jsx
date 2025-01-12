import React, { useState, useEffect } from "react";
import AttachFile from "../AttachFile/AttachFile";
import styles from "./MessageForm.module.scss";
import { sendMessageToBackend } from "../../utils/api";
import SendIcon from "@mui/icons-material/Send";

export function MessageForm({ chatId, droppedFile, messageSend }) {
  const [messageText, setMessageText] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // Состояние для отображения эффекта перетаскивания

  useEffect(() => {
    if (droppedFile) {
      setAttachedFile(droppedFile); // Устанавливаем файл, переданный из `ChatList`
    }
  }, [droppedFile]);

  const sendMessage = async (chatId, text, file, voice) => {
    const files = file ? [file] : [];

    try {
      const newMessage = await sendMessageToBackend(chatId, text, files, voice);
      setMessageText("");
      setAttachedFile(null);
      onMessageSend(newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      alert("Ваш браузер не поддерживает геолокацию.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
        sendMessage(chatId, mapLink, attachedFile, null);
      },
      (error) => {
        let errorMessage = "Не удалось получить геолокацию.";
        switch (error.code) {
          case 1:
            errorMessage = "Вы запретили доступ к геолокации.";
            break;
          case 2:
            errorMessage = "Ваше местоположение недоступно.";
            break;
          case 3:
            errorMessage = "Истекло время ожидания ответа от службы геолокации.";
            break;
          default:
            errorMessage = "Произошла неизвестная ошибка при получении геолокации.";
        }
        console.error("Error getting location:", error);
        alert(errorMessage);
      },
    );
  };

  const handleFileSelect = (file) => {
    setAttachedFile(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!messageText && !attachedFile) return;
    sendMessage(chatId, messageText, attachedFile, null);
    setRenderMessages();
  };

  // Drag-and-drop event handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setAttachedFile(file);
    }
  };

  return (
    <form
      className={`${styles.form} ${isDragging ? styles["dragging"] : ""}`} // Добавляем класс при перетаскивании
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onSubmit={handleSubmit}
    >
      <textarea
        className={styles["form-input"]}
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        placeholder="Введите сообщение"
      />
      <div className={styles["form-buttons"]}>
        <button type="button" onClick={handleLocationClick}>
          Отправить локацию
        </button>
        <AttachFile onFileSelect={handleFileSelect} />
        <button type="submit" className={styles["send-button"]}>
          <SendIcon sx={{ color: "#8e24aa" }} />
        </button>
      </div>
      {attachedFile && <div className={styles["attached-file"]}>Файл: {attachedFile.name}</div>}
    </form>
  );
}

export default MessageForm;
