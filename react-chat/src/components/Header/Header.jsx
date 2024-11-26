// components/Header/Header.jsx
import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import Menu from "./../Menu/Menu";

const Header = ({ chatId, currentChatTitle, onBackClick, onClearMessages, onOpenProfile }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [chatId]);

  const handleTitleClick = () => {
    if (chatId && onOpenProfile) {
      onOpenProfile(chatId); // Открываем профиль для текущего чата
    }
  };

  return (
    <header className={styles.header}>
      {!chatId && (
        <button className={styles["header__burger-menu"]} onClick={toggleMenu}>
          <img src="/images/burger-menu.svg" alt="Кнопка меню" />
        </button>
      )}
      <button className={styles.header__title} onClick={handleTitleClick}>
        <div className={styles["header__title-text"]}>
          {chatId ? `Chat with ${currentChatTitle}`: "Messenger"}
        </div>
      </button>
      <nav className={styles.header__nav}>
        <button className={styles["header__nav-searchButton"]}>
          <img src="/images/search-icon.svg" alt="Search" />
        </button>
        {chatId && <Menu chatId={chatId} onClearMessages={onClearMessages} />}
      </nav>
      {chatId && (
        <button className={styles.back_button} onClick={onBackClick}>
          <img src="/images/arrow-back.svg" alt="Back to chat list" />
        </button>
      )}
    </header>
  );
};

export default Header;
