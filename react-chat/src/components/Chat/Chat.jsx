import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Messages from "../Messages/Messages";
import MessageForm from "../MessageForm/MessageForm";
import styles from "./Chat.module.scss";
import { loadMessages } from "../Storage/Storage";

const Chat = ({ messages, setMessages }) => {
  const { chatId } = useParams(); // Получаем ID чата из URL
  const [error, setError] = useState(null);

  useEffect(() => {
    if (chatId) {
      try {
        const loadedMessages = loadMessages(chatId);
        setMessages(loadedMessages || []);
      } catch (err) {
        setError("Failed to load messages");
      }
    }
  }, [chatId, setMessages]);

  const handleMessageSend = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return (
    <div className={styles.chat}>
      {error && <div className={styles.error}>{error}</div>}
      <Messages messages={messages} />
      <MessageForm chatId={chatId} messageSend={handleMessageSend} />
    </div>
  );
};

export default Chat;
