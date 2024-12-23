import React, { useState } from "react";
import ChatList from "./components/ChatList/ChatList";
import Header from "./components/Header/Header";
import { clearMessages } from "./components/Storage/Storage"; 
import "./App.css";
import FloatingButton from "./components/FloatingButton/FloatingButton";

const App = () => {
  const [currentChatId, setCurrentChatId] = useState(null); 
  const [currentChatTitle, setCurrentChatTitle] = useState("");
  const [clearTrigger, setClearTrigger] = useState(false); // Триггер для перерисовки

  const openChat = (chatId, chatTitle) => {
    setCurrentChatId(chatId);
    setCurrentChatTitle(chatTitle);
  };

  const closeChat = () => {
    setCurrentChatId(null);
    setCurrentChatTitle(""); 
  };

  const handleClearMessages = () => {
    if (currentChatId) {
      clearMessages(currentChatId); 
      setClearTrigger(true) // Обновление триггера
    }
  };
  return (
    <div className="app-container">
      <Header
        currentChatTitle={currentChatTitle}
        chatId={currentChatId}
        backClick={closeChat}
        clearMessages={handleClearMessages} 
      />
      <ChatList 
        currentChatId={currentChatId}
        openChat={openChat}
        clearMessages={clearTrigger}
        setClearTrigger={setClearTrigger} 
      />
      {/* FloatingButton отображается только если нет открытого чата */}
      {!currentChatId && <FloatingButton />}
    </div>
  );
};

export default App;
