import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Contact } from 'entities/session';
import { contactsApi } from '../api/contacts.api';

export const contactFilterOptions = ['Все', 'Новые', 'Избранные'] as const;
const SEVEN_DAYS_IN_MS = 604800000;

interface ContactsState {
  contacts?: Contact[];
  filtered?: Contact[];
}

const initialContactsState: ContactsState = {
  contacts: [],
  filtered: [],
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,
  reducers: {
    clearsContactsData() {
      return initialContactsState;
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
      switch (action.payload) {
        // Все
        case 0:
          state.filtered = state.contacts;
          break;
        // Новые
        case 1:
          state.filtered = state.contacts.filter(
            (contact) => Number(new Date()) - Number(new Date(contact.createdAt)) <= SEVEN_DAYS_IN_MS,
          );
          break;
        // Избранные
        case 2:
          state.filtered = state.contacts.filter((contact) => contact.isFavorite);
          break;
        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(contactsApi.endpoints.getContacts.matchFulfilled, (state, { payload }) => {
      state.contacts = payload;
      state.filtered = payload;
    });
  },
});

export const selectContactList = (state: RootState) => state.contacts.contacts;
export const selectFilteredContacts = (state: RootState) => state.contacts.filtered;
export const { search, filterBy, clearsContactsData } = contactsSlice.actions;
