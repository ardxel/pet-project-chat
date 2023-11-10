import { combineReducers } from '@reduxjs/toolkit';
import { privateChatsSlice } from 'entities/chats';
import { contactsSlice } from 'entities/contacts';
import { sessionSlice } from 'entities/session';
import { themeSlice } from 'entities/theme';
import { baseApi } from 'shared/api/baseApi';

export const rootReducer = combineReducers({
  [privateChatsSlice.name]: privateChatsSlice.reducer,
  [contactsSlice.name]: contactsSlice.reducer,
  [sessionSlice.name]: sessionSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
