import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Contact } from 'entities/session';
import { contactsApi } from '../api/contacts.api';

export const contactFilterOptions = ['Все', 'Новые', 'Избранные'] as const;

interface ContactsState {
  contacts?: Contact[];
  filtered: Contact[];
}

const initialContactsState: ContactsState = {
  contacts: undefined,
  filtered: [],
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,
  reducers: {
    clearsContactsData(state) {
      state.contacts = [];
      state.filtered = [];
    },
    search(state, action: PayloadAction<string>) {
      const inputLower = action.payload.toLowerCase();
      state.filtered = state.contacts.filter((contact) => {
        const { firstName, lastName, name } = contact.user;
        const nameLower = name.toLowerCase();
        let fullname;
        if (contact.user.firstName && contact.user.lastName) {
          fullname = (firstName + lastName).toLowerCase();
        }

        return nameLower.includes(inputLower) || (fullname && fullname.includes(inputLower));
      });
    },
    filterBy(state, action: PayloadAction<number>) {
      console.log(action.payload);
      if (action.payload === 0) {
        state.filtered.length === 0;
        state.filtered = state.contacts;
      }

      if (action.payload === 1) {
        state.filtered.filter((contact) => Number(new Date()) - Number(new Date(contact.createdAt)) <= 604800000);
      }

      if (action.payload === 2) {
        state.filtered.filter((contact) => contact.isFavorite);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(contactsApi.endpoints.getContacts.matchFulfilled, (state, { payload }) => {
      console.log(payload);
      state.contacts = payload;
    });
  },
});

export const selectContactList = (state: RootState) => state.contacts.contacts;
export const selectFilteredContacts = (state: RootState) => state.contacts.filtered;
export const { search, filterBy, clearsContactsData } = contactsSlice.actions;
