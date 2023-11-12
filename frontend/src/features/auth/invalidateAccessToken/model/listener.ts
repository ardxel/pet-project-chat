import { TypedStartListening, createListenerMiddleware } from '@reduxjs/toolkit';
import { logoutThunk } from 'features/auth/logout';
import { invalidateAccessToken } from 'shared/api';
import type { AppDispatch } from 'shared/model';

export const invalidateAccessTokenListener = createListenerMiddleware();

/** @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage */
export type TypedListening = TypedStartListening<any, AppDispatch>;

export const startInvalidateAccessTokenListener = invalidateAccessTokenListener.startListening as TypedListening;

startInvalidateAccessTokenListener({
  actionCreator: invalidateAccessToken,
  effect: async (_, api) => {
    await api.dispatch(logoutThunk());
  },
});
