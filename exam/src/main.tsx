import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router basename="/2024-2-VK-EDU-Frontend-S-Pozolotin/">
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
