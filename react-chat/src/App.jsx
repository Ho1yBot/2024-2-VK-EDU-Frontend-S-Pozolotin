import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import ChatList from "./components/ChatList/ChatList";
import Chat from "./components/Chat/Chat";
import Header from "./components/Header/Header";
import FloatingButton from "./components/FloatingButton/FloatingButton";
import Profile from "./components/Profile/Profile";
import { clearMessages, loadMessages } from "./components/Storage/Storage";
import styles from "./App.module.scss";
import { LoginPage } from "./components/LoginPage/LoginPage";

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentChatId, setCurrentChatId] = useState(null);
  const [currentChatTitle, setCurrentChatTitle] = useState(localStorage.getItem("currentChatTitle"));
  const [messages, setMessages] = useState([]);
  const [selectedChat, setSelectedChat] = useState(JSON.parse(localStorage.getItem("selectedChat")) || null);
  
  const openChat = (chatId, chatTitle) => {
    const chatData = { chatId, chatTitle };
    setCurrentChatId(chatId);
    setCurrentChatTitle(chatTitle);
    setSelectedChat(chatData);
    localStorage.setItem("currentChatTitle", chatTitle);
    localStorage.setItem("selectedChat", JSON.stringify(chatData));
    navigate(`/chat/${chatId}`);
  };

  const closeChat = () => {
    setCurrentChatId(null);
    setCurrentChatTitle("");
    setSelectedChat(null);
    localStorage.removeItem('currentChatTitle');
    localStorage.removeItem("selectedChat");
    navigate("/");
  };

  const handleClearMessages = () => {
    if (chatId) {
      clearMessages(chatId);
      setMessages([]);
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentChatId(null);
      setCurrentChatTitle("");
      setSelectedChat(null);
    }
  }, [location]);

  useEffect(() => {
    if (currentChatId) {
      const loadedMessages = loadMessages(currentChatId);
      setMessages(loadedMessages || []);
    }
  }, [currentChatId]);

  const isProfilePage = location.pathname.startsWith("/profile");
  const match = location.pathname.match(/\/chat\/(\d+)/);
  const chatId = match ? match[1] : null;

  // Обновляем токен при каждом перерендеривании приложения
  useEffect(() => {
    fetch(`https://vkedu-fullstack-div2.ru/api/auth/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: localStorage.getItem("refreshToken") }),
    })
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem("accessToken", result.access);
        localStorage.setItem("refreshToken", result.refresh);
      })
      .catch((error) => {
        console.error("Ошибка обновления токена:", error);
      });
  }, []);

  return (
    <div className={styles["app-container"]}>
      {!isProfilePage && (
        <Header
          currentChatTitle={currentChatTitle}
          chatId={chatId}
          backClick={closeChat}
          clearMessages={handleClearMessages}
          setMessages={setMessages}
        />
      )}
      <Routes>
        <Route path="/" element={<ChatList openChat={openChat} />} />
        <Route path="/chat/:chatId" element={<Chat messages={messages} setMessages={setMessages} />} />
        <Route path="/profile/:userId" element={<Profile selectedChat={selectedChat} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {!selectedChat && <FloatingButton />}
    </div>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Проверяем, есть ли токен при загрузке приложения
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      setIsAuthenticated(true);
    }
  }, []);
  return <HashRouter>{isAuthenticated ? <AppContent /> : <LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />}</HashRouter>;
};

export default App;
