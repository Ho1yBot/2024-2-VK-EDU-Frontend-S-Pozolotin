import React, { useState } from "react";
import { saveMessage } from "./../Storage/Storage";
import AttachFile from "./../AttachFile/AttachFile";
import styles from "./MessageForm.module.scss";
// import { sendMessageToBackend } from "../../utils/api";

export function MessageForm({ chatId, onMessageSend }) {
  const [messageText, setMessageText] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);

  const sendMessage = async (chatId, text, file) => {
    const files = file ? [file] : [];
    try {
      const newMessage = await sendMessageToBackend(chatId, text, files);
      onMessageSend(newMessage);
      setMessageText("");
      setAttachedFile(null);
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
        sendMessage(mapLink);
      },
      (error) => {
        let errorMessage = "Не удалось получить геолокацию.";
        switch (error.code) {
          case 1: // PERMISSION_DENIED
            errorMessage = "Вы запретили доступ к геолокации.";
            break;
          case 2: // POSITION_UNAVAILABLE
            errorMessage = "Ваше местоположение недоступно.";
            break;
          case 3: // TIMEOUT
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
    sendMessage(messageText, attachedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileSelect(file);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} onDragOver={handleDragOver} onDrop={handleDrop}>
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
          <img src="/images/send-icon.svg" alt="Отправить" />
        </button>
      </div>
      {attachedFile && <div className={styles["attached-file"]}>Файл: {attachedFile.name}</div>}
    </form>
  );
}

export default MessageForm;
