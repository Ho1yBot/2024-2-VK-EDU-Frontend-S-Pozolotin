import React, { useState, useEffect } from "react";
import AttachFile from "../AttachFile/AttachFile";
import styles from "./MessageForm.module.scss";
import { sendMessageToBackend } from "../../utils/api";
import KeyboardVoiceIcon from "@mui/icons-material/KeyboardVoice";

export function MessageForm({ chatId, droppedFile, messageSend }) {
  const [messageText, setMessageText] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // Состояние для отображения эффекта перетаскивания
  const [renderMessages, setRenderMessages] = useState();
  const [isRecording, setIsRecording] = useState(false); // Состояние для записи голоса
  const [audioBlob, setAudioBlob] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  useEffect(() => {
    if (droppedFile) {
      setAttachedFile(droppedFile); // Устанавливаем файл, переданный из `ChatList`
    }
  }, [droppedFile]);

  const startRecording = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Ваш браузер не поддерживает запись аудио.");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      const audioChunks = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        setAudioBlob(audioBlob);
      };

      recorder.start();
      setMediaRecorder(recorder);
      setIsRecording(true);
    } catch (error) {
      console.error("Ошибка при запуске записи аудио:", error);
      alert("Не удалось начать запись.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const sendMessage = async (chatId, text, file, voice) => {
    const files = file ? [file] : [];
    try {
      const newMessage = await sendMessageToBackend(chatId, text, files, voice);
      setMessageText("");
      setAttachedFile(null);
      setAudioBlob(null);
      messageSend(newMessage);
    } catch (error) {
      console.error("Ошибка отправки сообщения:", error);
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
      }
    );
  };

  const handleFileSelect = (file) => {
    setAttachedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!messageText && !attachedFile && !audioBlob) return;

    const voice = audioBlob
      ? new File([audioBlob], "voice-message.wav", { type: "audio/wav" })
      : null;

    sendMessage(chatId, messageText, attachedFile, voice);
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
        {!isRecording ? (
          <button type="button" onClick={startRecording}>
            <KeyboardVoiceIcon sx={{ color: "#8e24aa" }} />
          </button>
        ) : (
          <button type="button" onClick={stopRecording}>
            <img src="/images/stop-icon.svg" alt="Остановить запись" />
          </button>
        )}
        <AttachFile fileSelect={handleFileSelect} />
        <button type="submit" className={styles["send-button"]}>
          <img src="/images/send-icon.svg" alt="Отправить" />
        </button>
      </div>
      {audioBlob && <p>Голосовое сообщение готово к отправке.</p>}
      {attachedFile && <div className={styles["attached-file"]}>Файл: {attachedFile.name}</div>}
    </form>
  );
}

export default MessageForm;
