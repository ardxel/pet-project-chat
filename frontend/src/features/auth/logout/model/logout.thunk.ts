import { createAsyncThunk } from '@reduxjs/toolkit';
import { chatSocket, clearPrivateChatsData } from 'entities/chats';
import { clearsContactsData } from 'entities/contacts';
import { clearSessionData, sessionApi } from 'entities/session';
import { clearUiVisibilityStateData } from 'entities/ui-visibility';
import { CONTACTS_TAG, PRIVATE_CHATS_TAG, SESSION_TAG } from 'shared/api';
import { wait } from 'shared/lib';

export const logoutThunk = createAsyncThunk<void, void>('authentication/logout', async (_: unknown, { dispatch }) => {
  await chatSocket.disconnect();

  dispatch(clearPrivateChatsData());
  dispatch(clearSessionData());
  dispatch(clearsContactsData());
  dispatch(clearUiVisibilityStateData());

  await wait(100);

  dispatch(sessionApi.util.invalidateTags([SESSION_TAG]));
  dispatch(sessionApi.util.invalidateTags([CONTACTS_TAG]));
  dispatch(sessionApi.util.invalidateTags([PRIVATE_CHATS_TAG]));
});
