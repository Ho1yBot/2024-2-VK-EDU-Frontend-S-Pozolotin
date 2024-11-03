import React from "react";
import styles from "./FloatingButton.module.scss";

const FloatingButton = ({ onClick }) => {
  return (
    <button className={styles["floating-button"]} onClick={onClick}>
      <img src="/images/create-chat.svg" alt="Создать новый чат" />
    </button>
  );
};

export default FloatingButton;
