import React from "react";
import styles from "./ChatList.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ChatList = ({ openChat }) => {
  const chats = [
    {
      id: 1,
      title: "Andrew",
      lastMessage: "Last message...",
      time: "14:23",
      isRead: true,
      userId: 101,
    },
    {
      id: 2,
      title: "Max",
      lastMessage: "Last message...",
      time: "16:27",
      isRead: true,
      userId: 102,
    },
  ];

  return (
    <div className={styles["chat-container"]}>
      <div id="chat-list-component" className={styles["chat-list-component"]}>
        {chats.map((chat) => {
          const messagesOfChat = JSON.parse(localStorage.getItem(`messages_${chat.id}`)) || [];
          const lastMessage = messagesOfChat.length ? messagesOfChat[messagesOfChat.length - 1] : { text: "No messages", time: "" };

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
    </div>
  );
};

export default ChatList;
