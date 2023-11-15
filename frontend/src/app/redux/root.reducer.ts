import { combineReducers } from '@reduxjs/toolkit';
import { privateChatsSlice } from 'entities/chats';
import { contactsSlice } from 'entities/contacts';
import { sessionSlice } from 'entities/session';
import { themeSlice } from 'entities/theme';
import { uiVisitibilySlice } from 'entities/ui-visibility';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { baseApi } from 'shared/api/baseApi';

const rootPersistConfig = {
  key: 'root',
  storage,
  whiteList: [sessionSlice.name, themeSlice.name, uiVisitibilySlice.name],
  blackList: [privateChatsSlice.name],
};

const privateChatsPersistConfig = {
  key: 'privateChats',
  storage: storage,
  blackList: [],
};

const reducers = combineReducers({
  [privateChatsSlice.name]: persistReducer(privateChatsPersistConfig, privateChatsSlice.reducer),
  [contactsSlice.name]: contactsSlice.reducer,
  [sessionSlice.name]: sessionSlice.reducer,
  [themeSlice.name]: themeSlice.reducer,
  [uiVisitibilySlice.name]: uiVisitibilySlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const rootReducer = persistReducer(rootPersistConfig, reducers);
