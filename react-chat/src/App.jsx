// App.jsx
import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import ChatList from "./components/ChatList/ChatList";
import Header from "./components/Header/Header";
import FloatingButton from "./components/FloatingButton/FloatingButton";
import Profile from "./components/Profile/Profile";
import { clearMessages } from "./components/Storage/Storage";
import styles from "./App.module.scss";

const AppContent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentChatId, setCurrentChatId] = useState(null);
  const [currentChatTitle, setCurrentChatTitle] = useState("");
  const [clearTrigger, setClearTrigger] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null); // Добавляем состояние для выбранного чата

  const openChat = (chatId, chatTitle) => {
    setCurrentChatId(chatId);
    setCurrentChatTitle(chatTitle);
    setSelectedChat({ chatId, chatTitle }); // Сохраняем данные о выбранном чате
    navigate(`/chat/${chatId}`); // Меняем URL при открытии чата
  };

  const openProfile = (userId) => {
    navigate(`/profile/${userId}`); // Переход в профиль пользователя
  };

  const closeChat = () => {
    setCurrentChatId(null);
    setCurrentChatTitle("");
    setSelectedChat(null); // Сбрасываем выбранный чат
    // navigate("/"); // Возвращаемся к списку чатов
  };

  const handleClearMessages = () => {
    if (currentChatId) {
      clearMessages(currentChatId);
      setClearTrigger(true); // Обновление триггера
    }
  };

  useEffect(() => {
    if (location.pathname === "/") {
      setCurrentChatId(null);
      setCurrentChatTitle("");
      setSelectedChat(null); // Сбрасываем выбранный чат при возврате на главную
    }
  }, [location]);

  // Проверка, находится ли пользователь на странице профиля
  const isProfilePage = location.pathname.startsWith("/profile");

  return (
    <div className={styles["app-container"]}>
      {/* Показ Header только если это не страница профиля */}
      {!isProfilePage && <Header currentChatTitle={currentChatTitle} chatId={currentChatId} backClick={closeChat} clearMessages={handleClearMessages} openProfile={openProfile} />}
      <Routes>
        <Route path="/" element={<ChatList currentChatId={null} openChat={openChat} />} />
        <Route
          path="/chat/:chatId"
          element={
            <ChatList
              currentChatId={currentChatId}
              openChat={openChat}
              openProfile={openProfile} // Передаём функцию для открытия профиля
              clearMessages={clearTrigger}
              setClearTrigger={setClearTrigger}
            />
          }
        />
        <Route
          path="/profile/:userId"
          element={<Profile selectedChat={selectedChat} />} // Передаем выбранный чат в Profile
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* FloatingButton отображается только если нет открытого чата */}
      {!currentChatId && <FloatingButton />}
    </div>
  );
};

const App = () => (
  <HashRouter>
    <AppContent />
  </HashRouter>
);

export default App;
