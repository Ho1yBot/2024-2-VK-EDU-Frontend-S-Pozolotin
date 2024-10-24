import React, { useState } from 'react';
import "./Menu.css"

const Menu = ({ onClearLocalStorage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header_menu">
      <button onClick={toggleMenu}>Menu</button>
      {isOpen && (
        <div className="menu">
          <ul className="menu_list">
            <li className="menu_item"><button>Info</button></li>
            <li className="menu_item"><button>Mute</button></li>
            <li className="menu_item"><button onClick={onClearLocalStorage}>Clear localStorage</button></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
