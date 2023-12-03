import { combineReducers } from '@reduxjs/toolkit';
import { ignoredPrivateChatsStateKeys, privateChatsSlice } from 'entities/chats';
import { contactsSlice } from 'entities/contacts';
import { sessionSlice } from 'entities/session';
import { themeSlice } from 'entities/theme';
import { ignoredUIVisibilityStateKeys, uiVisibilitySlice } from 'entities/ui-visibility';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { baseApi } from 'shared/api/baseApi';

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: [uiVisibilitySlice.name, privateChatsSlice.name],
};

const uiVisibilityPersistedReducer = persistReducer(
  {
    key: uiVisibilitySlice.name,
    storage,
    blacklist: ignoredUIVisibilityStateKeys,
  },
  uiVisibilitySlice.reducer,
);

const privateChatsPersistedReducer = persistReducer(
  {
    key: privateChatsSlice.name,
    storage,
    blacklist: ignoredPrivateChatsStateKeys,
  },
  privateChatsSlice.reducer,
);

// prettier-ignore
const reducers = combineReducers({
  [uiVisibilitySlice.name]: uiVisibilityPersistedReducer,
  [privateChatsSlice.name]: privateChatsPersistedReducer,
  [contactsSlice.name]:     contactsSlice.reducer,
  [sessionSlice.name]:      sessionSlice.reducer,
  [themeSlice.name]:        themeSlice.reducer,
  [baseApi.reducerPath]:    baseApi.reducer,
});

export const rootReducer = persistReducer(rootPersistConfig, reducers);
