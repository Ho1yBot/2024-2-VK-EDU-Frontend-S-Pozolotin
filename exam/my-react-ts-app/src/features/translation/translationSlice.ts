import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TranslationResponse } from '../../types';

const initialState: TranslationResponse[] = JSON.parse(localStorage.getItem('translationHistory') || '[]');

const translationSlice = createSlice({
    name: 'translation',
    initialState,
    reducers: {
      addTranslation: (state, action: PayloadAction<TranslationResponse>) => {
        state.push(action.payload);
        localStorage.setItem('translationHistory', JSON.stringify(state));
      },
      resetHistory: () => {
        return []; // Полная очистка состояния
      },
    },
  });
  
  export const { addTranslation, resetHistory } = translationSlice.actions;
  export default translationSlice.reducer;
  
