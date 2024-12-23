import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import "./HistoryPage.css"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const HistoryPage: React.FC = () => {
  const history = useSelector((state: RootState) => state.translation); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearHistory = () => {
    localStorage.removeItem('translationHistory'); 
    dispatch({ type: 'translation/resetHistory' });
  };

  const goBack = () => {
    navigate(-1); 
  };

  return (
    <div className="history-page">
      <header className="history-header">
        <h1 className="history-title">Translation History</h1>
        <button className="back-button" onClick={goBack}>
          <ArrowBackIcon /> Back
        </button>
        <button className="clear-button" onClick={clearHistory}>
          Clear History
        </button>
      </header>
      <section className="history-content">
        {history.length === 0 ? (
          <p className="no-history">No translation history available.</p>
        ) : (
          <ul className="history-list">
            {history.map((item, index) => (
              <li key={index} className="history-item">
                <p className="translated-text">{item.translatedText}</p>
                <span className="languages">
                  ({item.sourceLanguage} → {item.toLanguage})
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default HistoryPage;
