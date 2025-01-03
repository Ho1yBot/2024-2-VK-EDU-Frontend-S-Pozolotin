// components/Header/Header.jsx
import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import Menu from "../Menu/Menu";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import MenuIcon from '@mui/icons-material/Menu';

const Header = ({ currentChatTitle, chatId, backClick, clearMessages }) => {
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
          <MenuIcon sx={{color: "#fff"}} />
        </button>
      )}

      <button className={styles.header__title}>
        <div className={styles["header__title-text"]}>
          {currentChatTitle ? currentChatTitle : "Messenger"}
        </div>
      </button>

      <nav className={styles.header__nav}>
        <button className={styles["header__nav-searchButton"]}>
          <SearchIcon sx={{ color: '#fff' }}/>
        </button>

        {/* Передаем onClearMessages в Menu */}
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
