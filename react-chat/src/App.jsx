import React from 'react';
import Header from './components/Header/Header';
import ChatList from './components/ChatList/ChatList';
import FloatingButton from './components/FloatingButton/FloatingButton';
import './App.css';

const App = () => {
  return (
    <div>
      <Header />
      <ChatList />
      
      <FloatingButton />
    </div>
  );
};

export default App;
