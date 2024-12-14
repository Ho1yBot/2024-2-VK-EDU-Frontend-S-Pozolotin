// App.jsx
import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import ChatList from "./components/ChatList/ChatList";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import { clearMessages } from "./components/Storage/Storage";
import styles from "./App.module.scss";
import { LoginPage } from "./components/LoginPage/LoginPage";
import { requestNotificationPermission } from "./utils/notifications";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentChatId, clearCurrentChatId } from "../src/store/actions/currentChatIdActions";

const AppContent = () => {
  const dispatch = useDispatch();
  const currentChatId = useSelector((state) => state.chat.currentChatId); 
  const navigate = useNavigate();
  const location = useLocation();
  const [currentChatTitle, setCurrentChatTitle] = useState("");
  const [clearTrigger, setClearTrigger] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null); // Добавляем состояние для выбранного чата

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  const openChat = (chatId, chatTitle) => {
    dispatch(setCurrentChatId(chatId))
    setCurrentChatTitle(chatTitle);
    setSelectedChat({ chatId, chatTitle }); // Сохраняем данные о выбранном чате
    navigate(`/chat/${chatId}`); // Меняем URL при открытии чата
  };

  const openProfile = (userId) => {
    navigate(`/profile/${userId}`); // Переход в профиль пользователя
  };

  const closeChat = () => {
    dispatch(clearCurrentChatId(null))
    setCurrentChatTitle("");
    setSelectedChat(null); // Сбрасываем выбранный чат
    navigate("/"); // Возвращаемся к списку чатов
  };

  const handleClearMessages = () => {
    if (currentChatId) {
      clearMessages(currentChatId);
      setClearTrigger((prev) => !prev);
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
      {/* Показ Header только если это не страница профиля */}
      {!isProfilePage && (
        <Header
          currentChatTitle={currentChatTitle}
          backClick={closeChat}
          clearMessages={handleClearMessages}
          openProfile={openProfile}
        />
      )}
      <Routes>
        <Route path="/" element={<ChatList currentChatId={null} openChat={openChat} />} />
        <Route
          path="/chat/:chatId"
          element={
            <ChatList
              openChat={openChat}
              openProfile={openProfile} // Передаём функцию для открытия профиля
              clearMessages={clearTrigger}
            />
          }
        />
        <Route
          path="/profile/:userId"
          element={<Profile selectedChat={selectedChat} />} // Передаем выбранный чат в Profile
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {/* {!currentChatId && <FloatingButton />} */}
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
