import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatSocket } from 'entities/chats';
import { clearsContactsData } from 'entities/contacts';
import { clearSessionData, sessionApi } from 'entities/session';
import { CONTACTS_TAG, SESSION_TAG } from 'shared/api';

export const logoutThunk = createAsyncThunk<void, void, { state: RootState }>(
  'authentication/logout',
  async (_: unknown, { dispatch }) => {
    dispatch(clearSessionData());
    dispatch(clearsContactsData());

    await chatSocket.disconnect();

    dispatch(sessionApi.util.invalidateTags([SESSION_TAG]));
    dispatch(sessionApi.util.invalidateTags([CONTACTS_TAG]));
  },
);
