import React, { useState, useEffect } from "react";
import styles from "./ChatList.module.scss";
import { Messages } from "../Messages/Messages";
import { MessageForm } from "../MessageForm/MessageForm";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import useWebSocket from "../../hooks/useWebSocket";
import { getAuthHeaders, getAllChats, fetchMessagesFromBackend, fetchChatsWithLastMessages } from "../../utils/api";
import FloatingButton from "../FloatingButton/FloatingButton";
import { useParams, useNavigate } from "react-router-dom";
import { showNotification, playNotificationSound, requestNotificationPermission } from "../../utils/notifications";

const ChatList = ({ currentChatId, openChat, clearMessages }) => {
  const { chatId } = useParams();
  const navigate = useNavigate("/");
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState(JSON.parse(localStorage.getItem("friendsChat")) || []);
  const [allChats, setAllChats] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [droppedFile, setDroppedFile] = useState(null);
  const [lastMessages, setLastMessages] = useState({}); // Хранит последние сообщения из чатов
  // Запрашиваем разрешение на уведомления
  useEffect(() => {
    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const checkForNewMessages = async () => {
      try {
        const chatData = await fetchChatsWithLastMessages();
        setChats(chatData.results);

        // Проверяем новые сообщения
        chatData.results.forEach((chat) => {
          const previousMessage = lastMessages[chat.id]?.id;
          const latestMessage = chat.last_message;

          if (
            latestMessage &&
            latestMessage.id !== previousMessage &&
            chat.id !== currentChatId // Уведомления только для неактивных чатов
          ) {
            setLastMessages((prev) => {
              return ({
              ...prev,
              [chat.id]: latestMessage,
            })});

            // Показ уведомления и воспроизведение звука
            showNotification(`Новое сообщение в чате ${chat.title}`, {
              body: latestMessage.text || "Новое сообщение",
              icon: chat.avatar || "/default-icon.png",
            });
            playNotificationSound();
          }
        });
      } catch (error) {
        console.error("Ошибка при проверке новых сообщений:", error);
      }
    };

    // const interval = setInterval(checkForNewMessages, 5000); // Проверяем каждые 5 секунд
    // return () => clearInterval(interval);
  }, [currentChatId, lastMessages]);

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
      setDroppedFile(file); // Передаём файл в MessageForm
    }
  };

  const newMessages = useWebSocket(chatId);

  useEffect(() => {
    if (chatId && allChats[0]?.results.length > 0) {
      const chat = allChats[0]?.results.find((c) => c.id === chatId);
      if (chat) {
        openChat(chat.id, chat.title);
      }
    }
  }, [chatId, allChats, clearMessages]);

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
        console.error("Ошибка загрузки сообщений:", error);
      }
    };

    if (chatId) {
      loadChatMessages();
    }
  }, [chatId]);

  return (
    <div
      className={styles["chat-container"]}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {allChats.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <>
          <div
            id="chat-list-component"
            className={styles["chat-list-component"]}
            style={{ display: currentChatId ? "none" : "flex" }}
          >
            {allChats[0]?.results.map((chat) => {
              console.log(chat.last_message)
            return (
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
                    <p>{chat.last_message?.text || chat.last_message?.files[0]?.item.split("/").pop() || chat.last_message?.voice.split("voices/").pop() || "Нет сообщений"}</p>
                  </div>
                </div>
                <div className={styles["chat-time"]}>
                  <span>{chat.last_message?.timestamp || ""}</span>
                </div>
              </button>
            )})}
          </div>
          {chats.map((chat) => (
            <div
              className={styles["notification-container"]}
              key={chat.id}
              onClick={() => openChat(chat.id, chat.title)}
            >
              <h3 className={styles["notification-title"]}>{chat.title}</h3>
              <p className={styles["notification-text"]}>{chat.lastMessage}</p>
            </div>
          ))}
          {!currentChatId && <FloatingButton chats={allChats} setChats={setChats} />}
          {currentChatId && (
            <div className={styles["chat-window"]}>
              <Messages messages={messages} />
              <MessageForm
                chatId={currentChatId}
                droppedFile={droppedFile}
                messageSend={(newMessage) =>
                  setMessages((prevMessages) => [...prevMessages, newMessage])
                }
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
