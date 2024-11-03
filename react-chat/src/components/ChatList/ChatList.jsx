import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./ChatList.module.scss";
import { loadMessages } from "./../Storage/Storage";
import { Messages } from "./../Message/Message";
import { MessageForm } from "./../MessageForm/MessageForm";

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
      userId: 101, // Добавляем уникальный ID пользователя
    },
    {
      id: 2,
      avatar: "/images/user-icon.svg",
      title: "Max",
      lastMessage: "Last message...",
      time: "16:27",
      isRead: true,
      userId: 102, // Добавляем уникальный ID пользователя
    },
  ]);

  useEffect(() => {
    if (chatId) {
      const loadedMessages = loadMessages(chatId);
      setMessages(loadedMessages);
      const chat = chats.find((c) => c.id === Number(chatId));
      if (chat) onOpenChat(chat.id, chat.title);
    }
  }, [chatId, onClearMessages]);
  
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
            onClick={() => navigate(`/chat/${chat.id}`)}
          >
            <div className={styles["chat-info-wrp"]}>
              <img
                src={chat.avatar}
                alt="Avatar"
              />
              <div className={styles["chat-info"]}>
                <h3>
                  {chat.title}
                </h3>
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
              setMessages((prevMessages) => [...prevMessages, newMessage]);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatList;
