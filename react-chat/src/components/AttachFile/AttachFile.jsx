import React, { useState } from "react";
import FileUpload from "../FileUpload/FileUpload";
import styles from "./AttachFile.module.scss"
import AttachFileIcon from '@mui/icons-material/AttachFile';

const AttachFile = ({ fileSelect }) => {
  const [isAttachOpen, setIsAttachOpen] = useState(false);

  const toggleAttach = () => {
    setIsAttachOpen(!isAttachOpen);
  };

  return (
    <div>
      <button className={styles.attach} onClick={(e) => { e.preventDefault(); toggleAttach(); }}>
        <AttachFileIcon sx={{color: "#8e24aa"}}/>
      </button>
      {isAttachOpen && (
        <div className={styles.attach_container}>
          <ul className="attach_list">
            <li className={styles.attach_item}>
              <button onClick={(e) => { e.preventDefault(); fileSelect(); }}>Photo or video</button>
            </li>
            <li className={styles.attach_item}>
              <button onClick={(e) => { e.preventDefault(); fileSelect(); }}>Choose from gallery</button>
            </li>
            <li className={styles.attach_item}>
              <FileUpload fileSelect={(file) => { fileSelect(file); toggleAttach(); }} />
            </li>
          </ul>
        </div>gh
      )}
    </div>
  );
};

export default AttachFile;
