import React, { useState, useEffect } from "react";
import styles from "./ChatList.module.scss"; 
import { loadMessages, saveMessage } from "./../Storage/Storage";
import { Messages } from "./../Message/Message";
import { MessageForm } from "./../MessageForm/MessageForm";

const ChatList = ({ currentChatId, onOpenChat }) => {
  const [messages, setMessages] = useState([]); // Сообщения чата
  const [chats, setChats] = useState([
    // Моки чатов
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

  // Загрузка сообщений при открытии нового чата
  useEffect(() => {
    if (currentChatId) {
      const loadedMessages = loadMessages(currentChatId);
      setMessages(loadedMessages);
    }
  }, [currentChatId]);

  return (
    <div className={styles['chat-container']}>
      {/* Список чатов */}
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

      {/* Окно чата */}
      {currentChatId && (
        <div className={styles['chat-window']}>
          {/* Сообщения */}
          <Messages messages={messages} />

          {/* Форма отправки сообщений */}
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
