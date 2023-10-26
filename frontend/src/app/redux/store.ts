import { configureStore } from '@reduxjs/toolkit';
import { sessionSlice } from 'entities/session';
import { themeSlice } from 'entities/theme';
import { invalidateAccessTokenListener } from 'features/auth/invalidateAccessToken';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { baseApi, config } from 'shared/api';
import { rootReducer } from './root.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whiteList: [sessionSlice.name, themeSlice.name],
};

export const store = configureStore({
  devTools: config.isDev,
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefailtMiddleware) =>
    getDefailtMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(baseApi.middleware, invalidateAccessTokenListener.middleware),
});

export const persistedStore = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
