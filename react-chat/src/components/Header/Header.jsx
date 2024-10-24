import React, { useState, useEffect } from "react";
import "./Header.css";
import Menu from "./../Menu/Menu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenuOnClickOutside = (event) => {
    const menuButton = document.getElementById("menu-button");
    const menuContainer = document.getElementById("menu-container");
    if (
      !menuButton.contains(event.target) &&
      !menuContainer.contains(event.target)
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeMenuOnClickOutside);
    return () => {
      document.removeEventListener("click", closeMenuOnClickOutside);
    };
  }, []);

  return (
    <header className="header center">
      {/* Кнопка меню (назад) */}
      <button className="header_burger-menu">
        <img src="./images/burger-menu.svg" alt="Кнопка меню" />
      </button>

      {/* Информация о пользователе */}
      <button className="header_title">
        <div className="header_title-text">Messenger</div>
      </button>

      {/* Навигационные кнопки */}
      <nav className="header_nav">
        <button className="header_search">
          <img src="./images/search-icon.svg" alt="Search" />
        </button>

        {/* Кнопка меню (отображается по условию) */}
        <Menu />
      </nav>
    </header>
  );
};

export default Header;
