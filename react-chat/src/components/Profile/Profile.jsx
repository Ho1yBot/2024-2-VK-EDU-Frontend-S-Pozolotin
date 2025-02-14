import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Profile.module.scss";
import { getUserByID } from "./../../utils/api";

const Profile = ({}) => {
  const chatId = useParams();
  const navigate = useNavigate();
  const [selectedChat, onSelectedChat] = useState(null);

  useEffect(() => {
    const currentUserInfo = async () => {
      const info = await getUserByID();
      onSelectedChat(info);
    };

    currentUserInfo();
  }, [chatId]);

  const handleBackClick = () => {
    navigate(-1); // Возвращает на предыдущую страницу, т.е. в чат
  };

  return (
    <div className={styles["profile-container"]}>
      <header className={styles["profile-header"]}>
        <button className={styles["back-button"]} onClick={handleBackClick}>
          <img src="/images/arrow-back.svg" alt="Back to chat list" />
        </button>
        <p className={styles["profile-title"]}>{selectedChat?.chatTitle || "No Name"}</p>
        <button className={styles["save-button"]}>✔</button>
      </header>
      <div className={styles["content"]}>
        <div className={styles["profile-picture"]}>
          <img src="profile-pic-placeholder.jpg" alt="Profile" />
          <button className={styles["edit-picture-button"]}>📷</button>
        </div>
        <div className={styles["profile-input"]}>
          <label>Full name</label>
          <input type="text" value={selectedChat?.chatTitle || "No Name"} readOnly />
        </div>
        <div className={styles["profile-input"]}>
          <label>Chat ID</label>
          <input type="text" value={selectedChat?.chatId || "Unknown"} readOnly />
        </div>
        <div className={styles["profile-input"]}>
          <label>Bio</label>
          <input type="text" value="lorem and something else" readOnly />
          <small>Any details about you</small>
        </div>
      </div>
    </div>
  );
};

export default Profile;
