import React, { useState } from "react";
import ChatList from "./components/ChatList/ChatList";
import Header from "./components/Header/Header";

const App = () => {
  const [currentChatId, setCurrentChatId] = useState(null); // Текущий чат
  const [currentChatTitle, setCurrentChatTitle] = useState(""); // Название текущего чата

  // Открытие чата
  const openChat = (chatId, chatTitle) => {
    setCurrentChatId(chatId);
    setCurrentChatTitle(chatTitle);
  };

  // Закрытие чата и возврат к списку
  const closeChat = () => {
    setCurrentChatId(null);
    setCurrentChatTitle(""); // Возвращаем Messenger в хедере
  };

  return (
    <div className="app-container">
      {/* Header с передачей текущего названия чата и функции возврата */}
      <Header currentChatTitle={currentChatTitle} onBackClick={closeChat} />

      {/* Список чатов и чат. Передаем функцию открытия чата */}
      <ChatList
        currentChatId={currentChatId}
        onOpenChat={openChat}
      />
    </div>
  );
};

export default App;
