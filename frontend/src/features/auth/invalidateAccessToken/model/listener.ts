import { TypedStartListening, createListenerMiddleware } from '@reduxjs/toolkit';
import { logoutThunk } from 'features/auth/logout';
import { invalidateAccessToken } from 'shared/api/invalidateAccessTokenEvent';

export const invalidateAccessTokenListener = createListenerMiddleware();

/** @see https://redux-toolkit.js.org/api/createListenerMiddleware#typescript-usage */
export type TypedListening = TypedStartListening<RootState, AppDispatch>;

export const startInvalidateAccessTokenListener = invalidateAccessTokenListener.startListening as TypedListening;

startInvalidateAccessTokenListener({
  actionCreator: invalidateAccessToken,
  effect: async (_, api) => {
    api.dispatch(logoutThunk());
  },
});
