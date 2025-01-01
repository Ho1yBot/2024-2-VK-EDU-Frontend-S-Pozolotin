import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation, useParams } from "react-router-dom";
import ChatList from "./components/ChatList/ChatList";
import Chat from "./components/Chat/Chat";
import Header from "./components/Header/Header";
import FloatingButton from "./components/FloatingButton/FloatingButton";
import Profile from "./components/Profile/Profile";
import { clearMessages, loadMessages } from "./components/Storage/Storage";
import styles from "./App.module.scss";

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

const App = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;
