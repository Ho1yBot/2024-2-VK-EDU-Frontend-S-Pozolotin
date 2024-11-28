// components/Menu/Menu.jsx
import React, { useState, useEffect, useRef } from "react";
import styles from "./Menu.module.scss";

const Menu = ({ chatId, onClearMessages }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClearMessages = () => {
    onClearMessages(); 
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
    <div className={styles["header_menu"]} ref={menuRef}>
      <button onClick={toggleMenu}>
        <img src="/images/menu-dots.svg" alt="Меню чата" />
      </button>
      {isOpen && (
        <div className={styles.menu}>
          <ul className={styles["menu_list"]}>
            <li className={styles["menu_item"]}>
              <button>Info</button>
            </li>
            <li className={styles["menu_item"]}>
              <button>Mute</button>
            </li>
            <li className={styles["menu_item"]}>
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
