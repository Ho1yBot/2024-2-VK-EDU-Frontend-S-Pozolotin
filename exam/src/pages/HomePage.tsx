import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { translate } from "../api/translate";
import { addTranslation } from "../features/translation/translationSlice";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import languages from "./../../languages.json";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import HistoryIcon from "@mui/icons-material/History";

const HomePage: React.FC = () => {
  const [text, setText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("auto");
  const [toLanguage, setToLanguage] = useState("ru");
  const [translation, setTranslation] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTranslate = async () => {
    const result = await translate({ text, fromLanguage, toLanguage });
    if (result) {
      setTranslation(result.translatedText);
      dispatch(addTranslation({
        originalText: text, 
        translatedText: result.translatedText,
        sourceLanguage: fromLanguage,
        toLanguage: toLanguage
      }));
    }
  };
  

  const swapLanguages = () => {
    setFromLanguage(toLanguage);
    setToLanguage(fromLanguage);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleTranslate();
    }
  };

  const goToHistoryPage = () => {
    navigate("/history"); // Переход на страницу истории
  };

  return (
    <main className="translator-container">
      <div className="translator-request">
        <nav className="translator-header">
          <h1 className="title">VK Translate</h1>
          <button className="translator-history" onClick={goToHistoryPage}>
            {" "}
            <HistoryIcon
              sx={{
                color: "#333",
                borderRadius: "30px",
                width: "30px",
                height: "30px",
                padding: "2px",
                border: "1px solid #818181",
                "&:hover": {
                  color: "#2779E9",
                  border: "2px solid #2779E9",
                },
              }}
            />
          </button>
        </nav>
        <div className="language-selectors">
          <select className="language-selector" value={fromLanguage} onChange={(e) => setFromLanguage(e.target.value)}>
            <option value="auto">DETECT LANGUAGE</option>
            <option value="de">GERMAN</option>
            <option value="en">ENGLISH</option>
            <option value="ru">РУССКИЙ</option>
            <option value="es">SPANISH</option>
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
          <div className="swap-icon" onClick={swapLanguages}>
            <SwapHorizIcon
              sx={{
                color: "#333",
                borderRadius: "30px",
                width: "30px",
                height: "30px",
                padding: "2px",
                border: "1px solid #818181",
                "&:hover": {
                  color: "#2779E9",
                  border: "2px solid #2779E9",
                },
              }}
            />
          </div>
          <select className="language-selector" value={toLanguage} onChange={(e) => setToLanguage(e.target.value)}>
            <option value="de">GERMAN</option>
            <option value="en">ENGLISH</option>
            <option value="ru">РУССКИЙ</option>
            <option value="es">SPANISH</option>
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="textarea-wrapper">
          <textarea className="input-text" value={text} onKeyDown={handleKeyDown} onChange={(e) => setText(e.target.value)} placeholder="Enter text" />
          <textarea className="translation-result input-text" value={translation} readOnly placeholder="Translation" />
        </div>
        {/* <button className="translate-button" onClick={handleTranslate}>
          Translate
        </button> */}
      </div>
    </main>
  );
};

export default HomePage;
