// components/ChatList/ChatList.jsx
import React, { useState, useEffect } from "react";
import styles from "./ChatList.module.scss";
import { loadMessages } from "../Storage/Storage";
import { Messages } from "../Message/Messages";
import { MessageForm } from "../MessageForm/MessageForm";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ChatList = ({ currentChatId, openChat, clearMessages }) => {
  const [messages, setMessages] = useState([]);
  const chats = [
    {
      id: 1,
      title: "Chat with Andrew",
      lastMessage: "Last message...",
      time: "14:23",
      isRead: true,
    },
    {
      id: 2,
      title: "Chat with Max",
      lastMessage: "Last message...",
      time: "16:27",
      isRead: true,
    },
  ];

  useEffect(() => {
    if (currentChatId) {
      const loadedMessages = loadMessages(currentChatId);
      console.log(loadedMessages);
      setMessages(loadedMessages);
    }
  }, [currentChatId]);

  useEffect(() => {
    // Очищаем список сообщений после вызова onClearMessages
    setMessages([]);
  }, [clearMessages]);

  return (
    <div className={styles["chat-container"]}>
      <div id="chat-list-component" className={styles["chat-list-component"]} style={{ display: currentChatId ? "none" : "flex" }}>
        {chats.map((chat) => {
          const messagesOfChat = JSON.parse(localStorage.getItem(`messages_${chat.id}`))
          const lastMessage = messagesOfChat ? messagesOfChat[messagesOfChat.length - 1] : { text: "No messages", time: "" };
          console.log(lastMessage);

          return (
            <button key={chat.id} className={styles["chat-item"]} onClick={() => openChat(chat.id, chat.title)}>
              <div className={styles["chat-info-wrp"]}>
                <AccountCircleIcon fontSize="large" />
                <div className={styles["chat-info"]}>
                  <h3>{chat.title}</h3>
                  <p className={styles["chat-info-last"]}>{lastMessage?.text || lastMessage.file.name}</p>
                </div>
              </div>
              <div className={styles["chat-time"]}>
                <span>{lastMessage?.time || ""}</span>
                {chat.isRead && <span className={styles["read-status"]}>✓✓</span>}
              </div>
            </button>
          );
        })}
      </div>

      {currentChatId && (
        <div className={styles["chat-window"]}>
          <Messages messages={messages} />
          <MessageForm
            chatId={currentChatId}
            messageSend={(newMessage) => {
              setMessages((prevMessages) => [...prevMessages, newMessage]);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatList;
