import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import Menu from "../Menu/Menu";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import MenuIcon from "@mui/icons-material/Menu";

const Header = ({currentChatTitle, chatId, backClick, clearMessages, setMessages }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

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

  const openProfile = (userId) => {
    navigate(`/profile/${userId}`);
    console.log(userId);
  };

  return (
    <header className={styles.header}>
      {!chatId && (
        <button className={styles["header__burger-menu"]} id="menu-button" onClick={toggleMenu}>
          <MenuIcon sx={{ color: "#fff" }} />
        </button>
      )}
      <button className={styles.header__title} onClick={handleTitleClick}>
        <div className={styles["header__title-text"]}>{currentChatTitle ? `Chat with ${currentChatTitle}` : "Messenger"}</div>
      </button>
      <nav className={styles.header__nav}>
        <button className={styles["header__nav-searchButton"]}>
          <SearchIcon sx={{ color: "#fff" }} />
        </button>
        {chatId && <Menu chatId={chatId} clearMessages={clearMessages} setMessages={setMessages} />}
      </nav>
      {chatId && (
        <button className={styles.back_button} onClick={backClick}>
          <KeyboardBackspaceIcon sx={{ color: "#8e24aa" }} />
        </button>
      )}
    </header>
  );
};

export default Header;
