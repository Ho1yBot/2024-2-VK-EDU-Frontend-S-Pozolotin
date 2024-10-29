import React from "react";
import "./FloatingButton.css";

const FloatingButton = ({ onClick }) => {
  return (
    <button className="floating-button" onClick={onClick}>
      <img src="./images/create-chat.svg" alt="Создать новый чат" />
    </button>
  );
};

export default FloatingButton;
