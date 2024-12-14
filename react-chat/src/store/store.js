import { configureStore } from "@reduxjs/toolkit";
import currentChatIdReducer from "./reducers/currentChatIdReducer"; 

export const store = configureStore({
  reducer: {
    chat: currentChatIdReducer, // Регистрируем редьюсер
  },
});

export default store;
