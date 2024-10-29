// components/Header/Header.jsx
import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import Menu from "./../Menu/Menu";

const Header = ({ currentChatTitle, chatId, onBackClick, onClearMessages }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [currentChatTitle]);

  return (
    <header className={styles.header}>
      {!currentChatTitle && (
        <button className={styles["header__burger-menu"]} id="menu-button" onClick={toggleMenu}>
          <img src="./images/burger-menu.svg" alt="Кнопка меню" />
        </button>
      )}

      <button className={styles.header__title}>
        <div className={styles["header__title-text"]}>
          {currentChatTitle ? currentChatTitle : "Messenger"}
        </div>
      </button>

      <nav className={styles.header__nav}>
        <button className={styles["header__nav-searchButton"]}>
          <img src="./images/search-icon.svg" alt="Search" />
        </button>

        {/* Передаем onClearMessages в Menu */}
        {currentChatTitle && (
          <Menu chatId={chatId} onClearMessages={onClearMessages} />
        )}
      </nav>

      {currentChatTitle && (
        <button className={styles.back_button} onClick={onBackClick}>
          <img src="./images/arrow-back.svg" alt="Back to chat list" />
        </button>
      )}
    </header>
  );
};

export default Header;