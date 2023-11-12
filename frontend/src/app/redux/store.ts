import { configureStore } from '@reduxjs/toolkit';
import { privateChatsSlice } from 'entities/chats';
import { sessionSlice } from 'entities/session';
import { themeSlice } from 'entities/theme';
import { invalidateAccessTokenListener } from 'features/auth/invalidateAccessToken';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { baseApi, config } from 'shared/api';
import { StateType } from 'typesafe-actions';
import { rootReducer } from './root.reducer';
const persistConfig = {
  key: 'root',
  storage,
  whiteList: [sessionSlice.name, themeSlice.name],
  blackList: [privateChatsSlice.name],
};

export const buildStore = () =>
  configureStore({
    devTools: config.isDev,
    reducer: persistReducer(persistConfig, rootReducer) as typeof rootReducer,
    middleware: (getDefailtMiddleware) =>
      getDefailtMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(baseApi.middleware, invalidateAccessTokenListener.middleware),
  });

export const store = buildStore();
export const persistedStore = persistStore(store);

export type AppDispatch = (typeof store)['dispatch'];
export type RootState = StateType<(typeof store)['getState']>;
