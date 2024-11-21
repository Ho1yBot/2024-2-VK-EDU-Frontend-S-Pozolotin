// src/components/ChatList/ChatList.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ChatList.module.scss";
import { loadMessages } from "./../Storage/Storage";
import { Messages } from "./../Message/Message";
import { MessageForm } from "./../MessageForm/MessageForm";
import useWebSocket from "../../hooks/useWebSocket";

const ChatList = ({ currentChatId, onOpenChat, onClearMessages }) => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([
    {
      id: 1,
      avatar: "/images/user-icon.svg",
      title: "Andrew",
      lastMessage: "Last message...",
      time: "14:23",
      isRead: true,
      userId: 101,
    },
    {
      id: 2,
      avatar: "/images/user-icon.svg",
      title: "Max",
      lastMessage: "Last message...",
      time: "16:27",
      isRead: true,
      userId: 102,
    },
  ]);

  // Подключаемся к WebSocket с помощью useWebSocket и получаем новые сообщения
  const newMessages = useWebSocket(chatId);

  useEffect(() => {
    if (chatId) {
      console.log("Loading messages for chatId:", chatId); // Проверка перед загрузкой сообщений
      const loadedMessages = loadMessages(chatId);
      setMessages(loadedMessages);
    }
    const chat = chats.find((c) => c.id === Number(chatId));
    if (chat) {
      const chat = chats.find((c) => c.id === Number(chatId));
      if (chat) {
        onOpenChat(chat.id, chat.title);
      }
    }
  }, [chatId, onClearMessages]);

  // Добавляем новые сообщения из WebSocket в список сообщений
  useEffect(() => {
    if (newMessages.length > 0) {
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    }
  }, [newMessages]);

  return (
    <div className={styles["chat-container"]}>
      <div
        id="chat-list-component"
        className={styles["chat-list-component"]}
        style={{ display: currentChatId ? "none" : "flex" }}
      >
        {chats.map((chat) => (
          <button
            key={chat.id}
            className={styles["chat-item"]}
            onClick={() => {
              navigate(`/chat/${chat.id}`);
            }}
          >
            <div className={styles["chat-info-wrp"]}>
              <img src={chat.avatar} alt="Avatar" />
              <div className={styles["chat-info"]}>
                <h3>{chat.title}</h3>
                <p>{chat.lastMessage}</p>
              </div>
            </div>
            <div className={styles["chat-time"]}>
              <span>{chat.time}</span>
              {chat.isRead && <span className={styles["read-status"]}>✓✓</span>}
            </div>
          </button>
        ))}
      </div>
      {currentChatId && (
        <div className={styles["chat-window"]}>
          <Messages messages={messages} />
          <MessageForm
            chatId={currentChatId}
            onMessageSend={(newMessage) => {
              console.log("New message sent:", newMessage); // Проверка отправленного сообщения
              setMessages((prevMessages) => [...prevMessages, newMessage]);
            }}
          />
        </div>
      )}
    </div>
  );
};

// export const GetMessage = async () => {
//   const response = await fetch(`https://vkedu-fullstack-div2.ru/api/user/1`);
//   const data = await response.json();
//   console.log(data);
//   return data;
// };

// GetMessage()

export default ChatList;
