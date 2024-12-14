import { createReducer } from "@reduxjs/toolkit";
import { setCurrentChatId, clearCurrentChatId } from "../actions/currentChatIdActions";

// Начальное состояние
const initialState = {
  currentChatId: null,
};

// Редьюсер
const currentChatIdReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCurrentChatId, (state, action) => {
      state.currentChatId = action.payload; // Обновляем ID чата
    })
    .addCase(clearCurrentChatId, (state) => {
      state.currentChatId = null; // Сбрасываем ID чата
    });
});

export default currentChatIdReducer;