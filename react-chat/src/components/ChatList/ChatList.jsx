// src/components/ChatList/ChatList.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ChatList.module.scss";
import { loadMessages } from "./../Storage/Storage";
import { Messages } from "./../Message/Message";
import { MessageForm } from "./../MessageForm/MessageForm";
import useWebSocket from "../../hooks/useWebSocket";
import { getAuthHeaders, fetchMessagesFromBackend, sendMessageToBackend } from "../../utils/api";
import FloatingButton from "../FloatingButton/FloatingButton";

const ChatList = ({ currentChatId, currentChatTitle, onOpenChat, onClearMessages }) => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState(JSON.parse(localStorage.getItem("friendsChat")) || []);

  useEffect(() => {
    localStorage.setItem("friendsChat", JSON.stringify(chats));
  }, [chats]);

  // Подключаемся к WebSocket с помощью useWebSocket и получаем новые сообщения
  const newMessages = useWebSocket(chatId);

  useEffect(() => {
    if (chatId) {
      const loadedMessages = loadMessages(chatId);
      setMessages(loadedMessages);
    }
    const chat = chats.find((c) => {
      return c.id === chatId;
    });

    if (chat) {
      onOpenChat(chat.id, `${chat.first_name} ${chat.last_name}`);
    }
  }, [chatId, onClearMessages]);

  // Добавляем новые сообщения из WebSocket в список сообщений
  useEffect(() => {
    if (newMessages.length > 0) {
      setMessages((prevMessages) => [...prevMessages, ...newMessages]);
    }
  }, [newMessages]);

  useEffect(() => {
    const loadChatMessages = async () => {
      try {
        const response = await fetchMessagesFromBackend(chatId);
        setMessages(response.results); // Используем только массив сообщений
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    if (chatId) {
      loadChatMessages();
    }
  }, [chatId]);

  return (
    <div className={styles["chat-container"]}>
      <div id="chat-list-component" className={styles["chat-list-component"]} style={{ display: currentChatId ? "none" : "flex" }}>
        {chats.map((chat) => (
          <button
            key={chat.id}
            className={styles["chat-item"]}
            onClick={() => {
              navigate(`/chat/${chat.id}`);
            }}
          >
            <div className={styles["chat-info-wrp"]}>
              <img src={chat.avatar || "./images/user-icon.svg"} alt="Avatar" />
              <div className={styles["chat-info"]}>
                <h3>{chat.username}</h3>
                <p>{chat.lastMessage}</p>
              </div>
            </div>
            <div className={styles["chat-time"]}>
              <span>{chat.last_online_at}</span>
              {chat.isRead && <span className={styles["read-status"]}>✓✓</span>}
            </div>
          </button>
        ))}
      </div>
      {!currentChatId && <FloatingButton chats={chats} setChats={setChats} />}
      {currentChatId && (
        <div className={styles["chat-window"]}>
          <Messages messages={messages} />
          <MessageForm
            chatId={currentChatId}
            onMessageSend={(newMessage) => {
              setMessages((prevMessages) => [...prevMessages, newMessage]);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatList;
