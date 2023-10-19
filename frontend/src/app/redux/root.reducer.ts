import { combineReducers } from '@reduxjs/toolkit';
import { contactsSlice } from 'entities/contacts';
import { sessionSlice } from 'entities/session';
import { themeSlice } from 'entities/theme';
import { baseApi } from 'shared/api/baseApi';

export const rootReducer = combineReducers({
  [sessionSlice.name]: sessionSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
  [contactsSlice.name]: contactsSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});
