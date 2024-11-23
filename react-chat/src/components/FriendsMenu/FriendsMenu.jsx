// components/FriendsMenu/FriendsMenu.jsx
import React, { useState, useEffect } from "react";
import styles from "./FriendsMenu.module.scss";
import { getAuthHeaders } from "../../utils/api";

const FriendsMenu = ({ chats, setChats }) => {
  const [listFriends, setListFriends] = useState([]);

  useEffect(() => {
    const GetMessage = async () => {
      try {
        const response = await fetch(`https://vkedu-fullstack-div2.ru/api/users/`, {
          headers: getAuthHeaders(),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setListFriends(data.results);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      }
    };

    GetMessage();
  }, []);

  const addChat = (friend) => {
    setChats((prevChats) => [friend, ...prevChats]);
  }; 

  return (
    <article className={styles["friends-menu"]}>
      <div className={styles["friends-container"]}>
        {listFriends.map((friend) => (
          <button
            key={friend.id}
            className={styles["friends-button"]}
            onClick={() => {
              addChat(friend);
            }}
          >
            <div className={styles["friend-info"]}>
              <img src={friend.avatar || "./images/user-icon.svg"} alt="Avatar" />
              <div className={styles["friend-title"]}>
                <h4>{friend.username}</h4>
              </div>
            </div>
          </button>
        ))}
      </div>
    </article>
  );
};

export default FriendsMenu;
