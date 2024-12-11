import React, { useRef, useState } from "react";
import styles from "./FileUpload.module.scss";

const FileUpload = ({ fileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Файл загружен через input:", file.name);
      fileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true); // Показываем визуальный эффект
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false); // Убираем визуальный эффект
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false); // Убираем визуальный эффект
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      console.log("Файл загружен через Drop:", file.name);
      fileSelect(file);
      e.dataTransfer.clearData();
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Открываем диалоговое окно выбора файла
  };

  return (
    <div
      className={`${styles.fileUpload}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <button onClick={handleButtonClick}>Загрузить файл</button>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      {/* {isDragging && <div className={styles.dragOverlay}>Отпустите файл для загрузки</div>} */}
    </div>
  );
};

export default FileUpload;
