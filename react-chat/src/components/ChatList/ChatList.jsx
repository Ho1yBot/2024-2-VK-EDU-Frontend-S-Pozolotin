// src/components/ChatList/ChatList.jsx
import React, { useState, useEffect } from "react";
import styles from "./ChatList.module.scss";
import { Messages } from "../Messages/Messages";
import { MessageForm } from "../MessageForm/MessageForm";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useWebSocket from "../../hooks/useWebSocket";
import { getAuthHeaders, getAllChats, fetchMessagesFromBackend } from "../../utils/api";
import FloatingButton from "../FloatingButton/FloatingButton";
import { useParams, useNavigate } from "react-router-dom";


const ChatList = ({ currentChatId, openChat, clearMessages }) => {
  const { chatId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState(JSON.parse(localStorage.getItem("friendsChat")) || []);
  const [allChats, setAllChats] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [droppedFile, setDroppedFile] = useState(null);
  useEffect(() => {
    const checkChats = async () => {
      const allChats = await getAllChats();
      setAllChats(allChats);
    };

    checkChats();
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      setDroppedFile(file); // Передаём файл в MessageForm через состояние
    }
  };

  // useEffect(() => {
  //   localStorage.setItem("friendsChat", JSON.stringify(chats));
  // }, [chats]);

  // Подключаемся к WebSocket с помощью useWebSocket и получаем новые сообщения
  const newMessages = useWebSocket(chatId);

  useEffect(() => {
    if (chatId && allChats[0]?.results.length > 0) {
      const chat = allChats[0]?.results.find((c) => c.id === chatId);
      if (chat) {
        openChat(chat.id, chat.title);
      }
    }
  }, [chatId, allChats, clearMessages]);

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
        setMessages(response.results.reverse());
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    if (chatId) {
      loadChatMessages();
    }
  }, [chatId]);

  return (
    <div className={styles["chat-container"]} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      {allChats.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <>
          <div id="chat-list-component" className={styles["chat-list-component"]} style={{ display: currentChatId ? "none" : "flex" }}>
            {allChats[0].results.map((chat) => (
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
          {!currentChatId && <FloatingButton chats={allChats} setChats={setChats} />}
          {currentChatId && (
            <div className={styles["chat-window"]}>
              <Messages messages={messages} />
              <MessageForm
                chatId={currentChatId}
                droppedFile={droppedFile} // Передаём файл в MessageForm
                messageSend={(newMessage) => setMessages((prevMessages) => [...prevMessages, newMessage])} // Обновляем состояние
              />
              {dragging && <div className={styles["drag-overlay"]}>Отпустите файл для загрузки</div>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ChatList;
