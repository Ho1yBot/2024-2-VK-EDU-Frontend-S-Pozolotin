import React, { useState } from 'react';
import "./Menu.css"
import { clearMessages } from './../Storage/Storage';

const Menu = ({ chatId, onClearLocalStorage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClearMessages = () => {
    clearMessages(chatId);
    console.log(chatId);
  };

  return (
    <div className="header_menu">
      <button onClick={toggleMenu}><img src="./images/menu-dots.svg" alt="Меню чата" /></button>
      {isOpen && (
        <div className="menu">
          <ul className="menu_list">
            <li className="menu_item"><button>Info</button></li>
            <li className="menu_item"><button>Mute</button></li>
            <li className="menu_item"><button onClick={handleClearMessages}>Clear messages</button></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;