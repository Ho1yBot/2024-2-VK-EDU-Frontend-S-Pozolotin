import { createAction } from "@reduxjs/toolkit";

// Экшены
export const setCurrentChatId = createAction("SET_CURRENT_CHAT_ID");
export const clearCurrentChatId = createAction("CLEAR_CURRENT_CHAT_ID");
