import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteContact, getContacts, postContact } from 'services/contactsAPI';

const contactsInitialState = { contacts: [], isLoading: false, error: '' };

const contactsSlice = createSlice({
  // Ім'я слайсу
  name: 'contacts',
  // Початковий стан редюсера слайсу
  initialState: contactsInitialState,
  // Об'єкт редюсерів
  reducers: {},
  extraReducers: builder =>
    builder
      //get
      .addCase(fetchContacts.pending, (state, action) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      //del
      .addCase(delContact.pending, (state, action) => {
        state.isLoading = true;
        state.error = '';
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
      })
      //add
      .addCase(addContact.pending, (state, action) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts = [...state.contacts, action.payload];
        state.isLoading = false;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      }),
});

// Генератори екшенів

// Редюсер слайсу
export const contactsReducer = contactsSlice.reducer;

// санки
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
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
  'contacts/deleteContact',
  async (contactId, thunkApi) => {
    try {
      const contacts = await deleteContact(contactId);
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, thunkApi) => {
    try {
      const contacts = await postContact(newContact);
      return contacts;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
