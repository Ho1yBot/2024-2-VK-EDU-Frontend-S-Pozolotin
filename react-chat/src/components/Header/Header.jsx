import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { useNavigate } from "react-router-dom";
import Menu from "../Menu/Menu";
import SearchIcon from '@mui/icons-material/Search';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const Header = ({ currentChatTitle, chatId, backClick, clearMessages, openProfile }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [chatId]);

  const handleTitleClick = () => {
    if (currentChatTitle && openProfile) {
      openProfile(chatId); // Открываем профиль для текущего чата
    }
  };

  function LogOut(){
    localStorage.clear("accessToken");
    location.reload()
    navigate(`/`)
  }

  return (
    <header className={styles.header}>
      {!chatId && (
        <>
          <button className={styles["header__burger-menu"]} onClick={toggleMenu}>
            <img src="/images/burger-menu.svg" alt="Кнопка меню" />
          </button>
          <div className={`${styles["burger-menu-container"]} ${menuOpen ? styles.open : ""}`}>
            <button className={styles["burger-menu"]} onClick={LogOut}>
              LogOut
            </button>
          </div>
        </>
      )}
      <button className={styles.header__title} onClick={handleTitleClick}>
        <div className={styles["header__title-text"]}>{chatId ? `Chat with ${currentChatTitle}` : "Messenger"}</div>
      </button>
      <nav className={styles.header__nav}>
        <button className={styles["header__nav-searchButton"]}>
          <SearchIcon sx={{ color: '#fff' }}/>
        </button>
        {chatId && <Menu chatId={chatId} clearMessages={clearMessages} />}
      </nav>
      {chatId && (
        <button className={styles.back_button} onClick={backClick}>
          <KeyboardBackspaceIcon sx={{color: "#8e24aa"}}/>
        </button>
      )}
    </header>
  );
};

export default Header;
