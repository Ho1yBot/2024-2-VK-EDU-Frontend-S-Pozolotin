import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Messages from "../Messages/Messages";
import MessageForm from "../MessageForm/MessageForm";
import styles from "./Chat.module.scss";
import { fetchMessagesFromBackend } from "./../../utils/api";

const Chat = ({ setCurrentChatId }) => {
  const { chatId } = useParams(); // Получаем ID чата из URL
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [droppedFile, setDroppedFile] = useState(null);
  setCurrentChatId(chatId);

  useEffect(() => {
    const loadChatMessages = async () => {
      try {
        const response = await fetchMessagesFromBackend(chatId);
        setMessages(response.results.reverse());
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    if (chatId) {
      loadChatMessages();
    }
  }, [chatId]);

  const handleMessageSend = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setDroppedFile(file); // Передаём файл в MessageForm через состояние
    }
  };

  return (
    <div className={styles.chat + styles["chat-window"]} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      {error && <div className={styles.error}>{error}</div>}
      <Messages messages={messages} />
      <MessageForm
        chatId={chatId}
        messageSend={handleMessageSend}
        droppedFile={droppedFile} // Передаём файл в MessageForm
      />
      {dragging && <div className={styles["drag-overlay"]}>Отпустите файл для загрузки</div>}
    </div>
  );
};

export default Chat;
