import React from "react";
import styles from "./FloatingButton.module.scss";
import AddIcon from '@mui/icons-material/Add';

const FloatingButton = ({ onClick }) => {
  return (
    <button className={styles["floating-button"]} onClick={onClick}>
      <AddIcon fontSize="large" sx={{ color: "#fff" }}/>
    </button>
  );
};

export default FloatingButton;
