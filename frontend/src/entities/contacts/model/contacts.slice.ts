import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { Contact } from 'entities/session';
import moment from 'moment';
import { contactsApi } from '../api/contacts.api';
export const contactFilterOptions = ['Все', 'Новые', 'Избранные'] as const;
const SEVEN_DAYS_IN_MS = 604800000;

interface ContactsState {
  contacts?: Contact<true>[];
  filtered?: Contact<true>[];
  contactsIsExists: boolean;
  openedContactPageUserId: string | false;
}

export const initialContactsState: ContactsState = {
  contacts: [],
  filtered: [],
  contactsIsExists: false,
  openedContactPageUserId: false,
};

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: initialContactsState,
  reducers: {
    clearsContactsData() {
      return initialContactsState;
    },

    openContactPageById(state, action: PayloadAction<string | false>) {
      state.openedContactPageUserId = action.payload;
    },

    updateFilteredData(state, action: PayloadAction<Contact<true>[]>) {
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
          state.filtered = state.contacts.filter((contact) => contact.status === 'favorite');
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

export const { search, filterBy, clearsContactsData, updateFilteredData, openContactPageById } = contactsSlice.actions;

type Selector<S> = (state: RootState) => S;

const selectSelf = (state: RootState) => state;

export const selectContactList: Selector<ContactsState['contacts']> = createSelector(
  selectSelf,
  (state) => state.contacts.contacts,
);

export const selectFilteredContacts: Selector<ContactsState['contacts']> = createSelector(
  selectSelf,
  (state) => state.contacts.filtered,
);

export const selectContactsIsExists: Selector<ContactsState['contactsIsExists']> = createSelector(
  selectSelf,
  (state) => state.contacts.contactsIsExists,
);

export const selectOpenedContactPageUserId: Selector<ContactsState['openedContactPageUserId']> = createSelector(
  selectSelf,
  (state) => state.contacts.openedContactPageUserId,
);

export const selectOpenedPageContactData: Selector<Contact<true>> = createSelector(selectSelf, (state) => {
  const id = state.contacts.openedContactPageUserId;
  if (!state.contacts.contacts) return;
  return { ...state.contacts.contacts.find((contact) => contact.user._id === id) };
});

export const selectContactByUserId = (userId: string): Selector<Contact<true> | undefined> =>
  createSelector(selectSelf, (state) => {
    return state.contacts.contacts.find((contact) => contact.user._id === userId);
  });

export const selectIsExistContactByChatId = (chatId: string): Selector<boolean> =>
  createSelector(selectSelf, (state) => {
    const chat = state.privateChats.chats[chatId];
    if (!chat) return false;
    const companionId = chat.companion._id;
    return state.contacts.contacts.some((contact) => contact.user._id === companionId);
  });

export const selectContactsLength: Selector<number> = (state: RootState) => state.contacts.contacts.length;
