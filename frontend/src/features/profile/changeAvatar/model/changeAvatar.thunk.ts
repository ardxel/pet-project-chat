import { createAsyncThunk } from '@reduxjs/toolkit';
import { sessionApi } from 'entities/session';

export const changeAvatarThunk = createAsyncThunk('changeAvatar', async (body: FormData, { dispatch }) => {
  try {
    await dispatch(sessionApi.endpoints.changeAvatar.initiate(body)).unwrap();
  } catch (error) {
    console.log(error);
  }
});
