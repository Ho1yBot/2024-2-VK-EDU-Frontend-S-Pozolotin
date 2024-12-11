import React, { useState, useEffect } from "react";
import styles from "./FriendsMenu.module.scss";
import { createChat, getAuthHeaders } from "../../utils/api";

const FriendsMenu = ({ setChats }) => {
  const [listFriends, setListFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch(
          `https://vkedu-fullstack-div2.ru/api/users/?search=${encodeURIComponent(searchQuery)}`,
          { headers: getAuthHeaders() }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        setListFriends(data.results);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    // Запускаем поиск только если строка поиска изменилась
    const timeoutId = setTimeout(() => {
      fetchFriends();
    }, 300); // Дебаунс для уменьшения количества запросов

    return () => clearTimeout(timeoutId);
  }, [searchQuery]); // Запуск при изменении searchQuery

  const addChat = (friend) => {
    setChats((prevChats) => [friend, ...prevChats]);
  };

  return (
    <article className={styles["friends-menu"]}>
      <input
        type="search"
        placeholder="Поиск друзей..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Обновляем состояние поиска
      />
      <div className={styles["friends-container"]}>
        {listFriends.map((friend) => (
          <button
            key={friend.id}
            className={styles["friends-button"]}
            onClick={() => {addChat(friend); createChat({
              members: [friend.id],
              is_private: true,
              title: friend.first_name,
              avatar: null
            })}}
          >
            <div className={styles["friend-info"]}>
              <img
                src={friend.avatar || "./images/user-icon.svg"}
                alt="Avatar"
              />
              <div className={styles["friend-title"]}>
                <h4>{friend.username}</h4>
                <p>{friend.first_name} {friend.last_name}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </article>
  );
};

export default FriendsMenu;
