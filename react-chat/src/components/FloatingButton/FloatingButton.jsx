import React, { useState, useEffect } from "react";
import styles from "./FloatingButton.module.scss";
import FriendsMenu from "../FriendsMenu/FriendsMenu";

const FloatingButton = ({ chats, setChats }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <button className={styles["floating-button"]} onClick={toggleMenu}>
        <img src="/images/create-chat.svg" alt="Создать новый чат" />
      </button>
      {isMenuOpen && <FriendsMenu chats={chats} setChats={setChats} />}
    </div>
  );
};

export default FloatingButton;
