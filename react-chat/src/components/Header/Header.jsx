import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss"; // Импортируем SCSS-модули
import Menu from "./../Menu/Menu";

const Header = ({ currentChatTitle, chatId, onBackClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false); // Закрываем меню при смене чата
  }, [currentChatTitle]);

  return (
    <header className={styles.header}>
      {/* Кнопка бургер-меню, отображается только в списке чатов */}
      {!currentChatTitle && (
        <button className={styles["header__burger-menu"]} id="menu-button">
          <img src="./images/burger-menu.svg" alt="Кнопка меню" />
        </button>
      )}

      {/* Название чата или Messenger */}
      <button className={styles.header__title}>
        <div className={styles["header__title-text"]}>
          {currentChatTitle ? currentChatTitle : "Messenger"}
        </div>
      </button>

      {/* Навигационные кнопки */}
      <nav className={styles.header__nav}>
        {/* Кнопка поиска */}
        <button className={styles["header__nav"].searchButton}>
          <img src="./images/search-icon.svg" alt="Search" />
        </button>

        {/* Кнопка меню, отображается только в конкретном чате */}
        {currentChatTitle && (
          <Menu chatId={chatId} />  // Передача chatId в компонент Menu
        )}
      </nav>

      {/* Кнопка назад при нахождении в чате */}
      {currentChatTitle && (
        <button className={styles['back_button']} onClick={onBackClick}>
          <img src="./images/arrow-back.svg" alt="Back to chat list" />
        </button>
      )} 
    </header>
  );
};

export default Header;