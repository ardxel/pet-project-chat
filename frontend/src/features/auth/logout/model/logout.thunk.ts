import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearSessionData } from 'entities/session/model/session.slice';

export const logoutThunk = createAsyncThunk<void, void, { state: RootState }>(
  'authentication/logout',
  async (_: unknown, { dispatch }) => {
    dispatch(clearSessionData());
  },
);
