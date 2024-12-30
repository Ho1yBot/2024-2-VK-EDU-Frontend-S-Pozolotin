// components/Messages/Messages.jsx
import React, { useEffect, useRef } from "react";
import styles from "./Messages.module.scss";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";

export function Messages({ messages, setClearTrigger }) {
  const messagesEndRef = useRef(null);
  console.log(messages);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setClearTrigger(false);
  }, [messages]);
  return (
    <div className={styles["messages-container"]}>
      {messages.map((message, index) => (
        <div key={index} className={styles["message-container"]}>
          <div className={styles["message-sender"]}>{message.sender}</div>
          {message.file?.type === "image" && <img src={message.file.content} alt="picture" className={styles["message-content"]}></img>}
          {message.file?.type === "file" && <InsertDriveFileIcon sx={{ color: "#8e24aa" }} fontSize="large" />}
          <div className={styles["message-text"]}>{message.text}</div>
          <div className={styles["message-time"]}>{message.time}</div>
          {message.file && (
            <div className={styles["message-file"]}>
              <p className={styles["message-file-name"]}>{message.file.name}</p>
              <a href={message.file.content} download>
                Скачать файл
              </a>
            </div>
          )}
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default Messages;
