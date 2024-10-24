import React, { useState, useEffect } from "react";
import "./ChatList.css";
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
    // Добавь больше чатов по необходимости
  ]);

  // Загрузка сообщений при открытии нового чата
  useEffect(() => {
    if (currentChatId) {
      const loadedMessages = loadMessages(currentChatId);
      setMessages(loadedMessages);
    }
  }, [currentChatId]);

  return (
    <div className="chat-container">
      {/* Список чатов */}
      <div
        id="chat-list-component"
        className="chat-list-component"
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
              className="chat-item"
              onClick={() => onOpenChat(chat.id, chat.title)}
            >
              <div className="chat-info-wrp">
                <img src={chat.avatar} alt="Avatar" />
                <div className="chat-info">
                  <h3>{chat.title}</h3>
                  <p>{lastMessage.text}</p>
                </div>
              </div>
              <div className="chat-time">
                <span>{lastMessage.time || ""}</span>
                {chat.isRead && <span className="read-status">✓✓</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Окно чата */}
      {currentChatId && (
        <div className="chat-window">
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
