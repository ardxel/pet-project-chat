import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { Contact } from 'entities/session';
import moment from 'moment';
import { contactsApi } from '../api/contacts.api';
export const contactFilterOptions = ['Все', 'Новые', 'Избранные'] as const;
const SEVEN_DAYS_IN_MS = 604800000;

interface ContactsState {
  contacts?: Contact[];
  contactsIsExists: boolean;
  filtered?: Contact[];
}

export const initialContactsState: ContactsState = {
  contacts: [],
  contactsIsExists: false,
  filtered: [],
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,
  reducers: {
    clearsContactsData() {
      return initialContactsState;
    },

    updateFilteredData(state, action: PayloadAction<Contact[]>) {
      state.filtered = action.payload;
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
            (contact) => moment(new Date()).diff(contact.createdAt) <= SEVEN_DAYS_IN_MS,
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
      state.filtered = [...payload];
      state.contactsIsExists = true;
    });
    builder.addMatcher(contactsApi.endpoints.addContact.matchFulfilled, (state, { payload }) => {
      state.contacts.push(payload.new_contact);
      state.filtered.push(payload.new_contact);
    });
    builder.addMatcher(contactsApi.endpoints.deleteContact.matchFulfilled, (state, { payload }) => {
      const contactsWithoutDeleted = state.contacts.filter((contact) => contact.user._id !== payload.deletedId);
      state.contacts = contactsWithoutDeleted;
      state.filtered = [...contactsWithoutDeleted];
    });
  },
});

export const { search, filterBy, clearsContactsData, updateFilteredData } = contactsSlice.actions;

const selectSelf = (state: RootState) => state;

export const selectContactList = createSelector(selectSelf, (state) => state.contacts.contacts);
export const selectFilteredContacts = createSelector(selectSelf, (state) => state.contacts.filtered);
export const selectContactsIsExists = (state: RootState) => state.contacts.contactsIsExists;
