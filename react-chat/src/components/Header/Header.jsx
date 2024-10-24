import React, { useState, useEffect } from "react";
import "./Header.css";
import Menu from "./../Menu/Menu";

const Header = ({ currentChatTitle, onBackClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    setMenuOpen(false); // Закрываем меню при смене чата
  }, [currentChatTitle]);

  return (
    <header className="header center">
      {/* Кнопка бургер-меню, отображается только в списке чатов */}
      {!currentChatTitle && (
        <button className="header_burger-menu" id="menu-button">
          <img src="./images/burger-menu.svg" alt="Кнопка меню" />
        </button>
      )}

      {/* Название чата или Messenger */}
      <button className="header_title">
        <div className="header_title-text">
          {currentChatTitle ? currentChatTitle : "Messenger"}
        </div>
      </button>

      {/* Навигационные кнопки */}
      <nav className="header_nav">
        {/* Кнопка поиска */}
        <button className="header_search">
          <img src="./images/search-icon.svg" alt="Search" />
        </button>

        {/* Кнопка меню, отображается только в конкретном чате */}
        {currentChatTitle && (
          <button className="header_menu-button" onClick={toggleMenu}>
            <img src="./images/menu-icon.svg" alt="Menu" />
          </button>
        )}

        {/* Выпадающее меню */}
        {menuOpen && <Menu />}
      </nav>

      {/* Кнопка назад при нахождении в чате */}
      {currentChatTitle && (
        <button className="back-button" onClick={onBackClick}>
          <img src="./images/arrow-back.svg" alt="Back to chat list" />
        </button>
      )}
    </header>
  );
};

export default Header;
