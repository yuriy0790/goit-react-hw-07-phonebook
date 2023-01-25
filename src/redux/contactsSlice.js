import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteContact, getContacts } from 'services/contactsAPI';
const contactsInitialState = { contacts: [], isLoading: false, error: null };

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState: contactsInitialState,
  // Об'єкт редюсерів
  reducers: {
    addContact(state, { payload }) {
      return [...state, payload];
    },
  },
  extraReducers: builder =>
    builder
      //get
      .addCase(requestContacts.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.isLoading = false;
      })
      .addCase(requestContacts.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      //del
      .addCase(delContact.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(delContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
        state.isLoading = false;
      })
      .addCase(delContact.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      }),
});

// Генератори екшенів
export const { addContact } = contactsSlice.actions;
// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;

// санки
export const requestContacts = createAsyncThunk(
  'contacts/requestContacts',
  async (_, thunkApi) => {
    try {
      const contacts = await getContacts();
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const delContact = createAsyncThunk(
  'contacts/deleteContacts',
  async (contactId, thunkApi) => {
    try {
      const contacts = await deleteContact(contactId);
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);