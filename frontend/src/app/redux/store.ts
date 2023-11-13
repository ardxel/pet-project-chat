import { configureStore } from '@reduxjs/toolkit';
import { invalidateAccessTokenListener } from 'features/auth/invalidateAccessToken';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistStore } from 'redux-persist';
import { baseApi, config } from 'shared/api';
import { StateType } from 'typesafe-actions';
import { rootReducer } from './root.reducer';

export const buildStore = () =>
  configureStore({
    devTools: config.isDev,
    reducer: rootReducer,
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
