import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatSocket, clearChatsData } from 'entities/chats';
import { clearsContactsData } from 'entities/contacts';
import { clearSessionData, sessionApi } from 'entities/session';
import { CONTACTS_TAG, SESSION_TAG } from 'shared/api';

export const logoutThunk = createAsyncThunk<void, void, { state: RootState }>(
  'authentication/logout',
  async (_: unknown, { dispatch }) => {
    await chatSocket.disconnect();

    dispatch(clearSessionData());
    dispatch(clearsContactsData());
    dispatch(clearChatsData());

    dispatch(sessionApi.util.invalidateTags([SESSION_TAG]));
    dispatch(sessionApi.util.invalidateTags([CONTACTS_TAG]));

    localStorage.clear();
  },
);
