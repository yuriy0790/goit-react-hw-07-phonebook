import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = '';

const filterSlice = createSlice({
  // Ім'я слайсу
  name: 'filter',
  // Початковий стан редюсера слайсу
  initialState: filterInitialState,
  // Об'єкт редюсерів
  reducers: {
    filterContacts(state, { payload }) {
      return payload;
    },
  },
});

// Генератори екшенів
export const { filterContacts } = filterSlice.actions;
// Редюсер слайсу
export const filterReducer = filterSlice.reducer;
