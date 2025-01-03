import React, { useState, useEffect } from "react";
import styles from "./FloatingButton.module.scss";
import FriendsMenu from "../FriendsMenu/FriendsMenu";
import AddIcon from "@mui/icons-material/Add";

const FloatingButton = ({ chats, setChats }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <button className={styles["floating-button"]} onClick={toggleMenu}>
        <AddIcon fontSize="large" sx={{ color: "#fff" }} />
      </button>
      {isMenuOpen && <FriendsMenu chats={chats} setChats={setChats} />}
    </div>
  );
};

export default FloatingButton;
