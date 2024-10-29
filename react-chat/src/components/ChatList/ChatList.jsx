// components/ChatList/ChatList.jsx
import React, { useState, useEffect } from "react";
import styles from "./ChatList.module.scss";
import { loadMessages } from "./../Storage/Storage";
import { Messages } from "./../Message/Message";
import { MessageForm } from "./../MessageForm/MessageForm";

const ChatList = ({ currentChatId, onOpenChat, onClearMessages }) => {
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([
    {
      id: 1,
      avatar: "./images/user-icon.svg",
      title: "Chat with Andrew",
      lastMessage: "Last message...",
      time: "14:23",
      isRead: true,
    },
    {
      id: 2,
      avatar: "./images/user-icon.svg",
      title: "Chat with Max",
      lastMessage: "Last message...",
      time: "16:27",
      isRead: true,
    },
  ]);

  useEffect(() => {
    if (currentChatId) {
      const loadedMessages = loadMessages(currentChatId);
      setMessages(loadedMessages);
    }
  }, [currentChatId]);

  useEffect(() => {
    // Очищаем список сообщений после вызова onClearMessages
    setMessages([]);
  }, [onClearMessages]);

  return (
    <div className={styles['chat-container']}>
      <div
        id="chat-list-component"
        className={styles['chat-list-component']}
        style={{ display: currentChatId ? "none" : "flex" }}
      >
        {chats.map((chat) => {
          const lastMessage =
            messages.length > 0
              ? messages[messages.length - 1]
              : { text: "No messages", time: "" };

          return (
            <button
              key={chat.id}
              className={styles['chat-item']}
              onClick={() => onOpenChat(chat.id, chat.title)}
            >
              <div className={styles['chat-info-wrp']}>
                <img src={chat.avatar} alt="Avatar" />
                <div className={styles['chat-info']}>
                  <h3>{chat.title}</h3>
                  <p>{lastMessage.text}</p>
                </div>
              </div>
              <div className={styles['chat-time']}>
                <span>{lastMessage.time || ""}</span>
                {chat.isRead && <span className={styles['read-status']}>✓✓</span>}
              </div>
            </button>
          );
        })}
      </div>

      {currentChatId && (
        <div className={styles['chat-window']}>
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
