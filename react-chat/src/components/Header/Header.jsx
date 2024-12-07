// components/Header/Header.jsx
import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import Menu from "../Menu/Menu";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Header = ({ currentChatTitle, chatId, backClick, clearMessages, openProfile }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [currentChatTitle]);

  const handleTitleClick = () => {
    if (currentChatTitle && openProfile) {
      openProfile(chatId); // Открываем профиль для текущего чата
    }
  };

  return (
    <header className={styles.header}>
      {!currentChatTitle && (
        <button className={styles["header__burger-menu"]} onClick={toggleMenu}>
          <img src="/images/burger-menu.svg" alt="Кнопка меню" />
        </button>
      )}
      <button className={styles.header__title} onClick={handleTitleClick}>
        <div className={styles["header__title-text"]}>
          {currentChatTitle ? `Chat with ${currentChatTitle}`: "Messenger"}
        </div>
      </button>
      <nav className={styles.header__nav}>
        <button className={styles["header__nav-searchButton"]}>
          <SearchIcon sx={{ color: '#fff' }}/>
        </button>

        {/* Передаем clearMessages в Menu */}
        {currentChatTitle && (
          <Menu chatId={chatId} clearMessages={clearMessages} />
        )}
      </nav>
      {currentChatTitle && (
        <button className={styles.back_button} onClick={backClick}>
          <KeyboardBackspaceIcon sx={{color: "#8e24aa"}}/>
        </button>
      )}
    </header>
  );
};

export default Header;
