// components/Menu/Menu.jsx
import React, { useState, useEffect, useRef } from "react";
import "./Menu.css";

const Menu = ({ chatId, onClearMessages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClearMessages = () => {
    onClearMessages(); // Вызываем функцию очистки сообщений
    toggleMenu(); 
    
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="header_menu" ref={menuRef}>
      <button onClick={toggleMenu}>
        <img src="./images/menu-dots.svg" alt="Меню чата" />
      </button>
      {isOpen && (
        <div className="menu">
          <ul className="menu_list">
            <li className="menu_item">
              <button>Info</button>
            </li>
            <li className="menu_item">
              <button>Mute</button>
            </li>
            <li className="menu_item">
              <button onClick={handleClearMessages}>
                Clear messages
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
