import React, { useState } from "react";
import FileUpload from "./../FileUpload/FileUpload";
import styles from "./AttachFile.module.scss"

const AttachFile = ({ onFileSelect }) => {
  const [isAttachOpen, setIsAttachOpen] = useState(false);

  const toggleAttach = () => {
    setIsAttachOpen(!isAttachOpen);
  };

  return (
    <div>
      <button className={styles.attach} onClick={(e) => { e.preventDefault(); toggleAttach(); }}><img src="./images/attach-file-icon.svg" alt="Прикрепить файл" /></button>
      {isAttachOpen && (
        <div className={styles.attach_container}>
          <ul className="attach_list">
            <li className={styles.attach_item}>
              <button onClick={(e) => { e.preventDefault(); onFileSelect(); }}>Photo or video</button>
            </li>
            <li className={styles.attach_item}>
              <button onClick={(e) => { e.preventDefault(); onFileSelect(); }}>Choose from gallery</button>
            </li>
            <li className={styles.attach_item}>
              <FileUpload onFileSelect={(file) => { onFileSelect(file); toggleAttach(); }} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AttachFile;
