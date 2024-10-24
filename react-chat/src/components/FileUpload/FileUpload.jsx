import React, { useRef } from "react";

const FileUpload = ({ onFileSelect }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Файл загружен:', file.name);
      onFileSelect(file);
    }
  };

  const handleButtonClick = () => {
    // Программно вызываем клик по скрытому инпуту
    fileInputRef.current.click();
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Загрузить файл</button>
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />
    </div>
  );
};

export default FileUpload;
