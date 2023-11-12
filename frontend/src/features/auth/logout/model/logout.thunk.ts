import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatSocket, clearPrivateChatsData } from 'entities/chats';
import { clearsContactsData } from 'entities/contacts';
import { clearSessionData, sessionApi } from 'entities/session';
import { CONTACTS_TAG, PRIVATE_CHATS_TAG, SESSION_TAG } from 'shared/api';

export const logoutThunk = createAsyncThunk<void, void>('authentication/logout', async (_: unknown, { dispatch }) => {
  await chatSocket.disconnect();

  dispatch(clearSessionData());
  dispatch(clearsContactsData());
  dispatch(clearPrivateChatsData());

  dispatch(sessionApi.util.invalidateTags([SESSION_TAG]));
  dispatch(sessionApi.util.invalidateTags([CONTACTS_TAG]));
  dispatch(sessionApi.util.invalidateTags([PRIVATE_CHATS_TAG]));

  localStorage.clear();
});
