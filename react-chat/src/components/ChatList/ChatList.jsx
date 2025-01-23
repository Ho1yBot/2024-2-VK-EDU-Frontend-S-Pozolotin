// src/components/ChatList/ChatList.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ChatList.module.scss";
import { getAllChats, fetchMessagesFromBackend } from "../../utils/api";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const ChatList = ({ currentChatId }) => {
  const navigate = useNavigate();
  // const [chats, setChats] = useState(JSON.parse(localStorage.getItem("friendsChat")) || []);
  const [allChats, setAllChats] = useState([]);
  const [userId, setUserId] = useState([])

  useEffect(() => {
    const checkChats = async () => {
      const allChats = await getAllChats();
      console.log(allChats);
      setAllChats(allChats);
      setUserId(allChats)
    };

    checkChats();
  }, []);  

  return (
    <div className={styles["chat-container"]} >
      {allChats.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <>
          <div id="chat-list-component" className={styles["chat-list-component"]} style={{ display: currentChatId ? "none" : "flex" }}>
            {allChats[0].results.map((chat) => (
              <button key={chat.id} className={styles["chat-item"]} onClick={() => {
                  navigate(`/chat/${chat.id}`);
                }}>
                <div className={styles["chat-info-wrp"]}>
                <AccountCircleIcon fontSize="large" />
                  <div className={styles["chat-info"]}>
                    <h3>{chat.title}</h3>
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
          
        </>
      )}
    </div>
  );
};

export default ChatList;
