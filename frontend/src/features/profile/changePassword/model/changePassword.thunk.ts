import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, sessionApi } from 'entities/session';
import { isRegisteredError } from 'shared/api';
import { ClientError, ServerError } from 'shared/exceptions';

export const changePasswordThunk = createAsyncThunk(
  'changePassword',
  async (body: Pick<IUser, '_id'> & { newPassword: string; oldPassword: string }, { dispatch }) => {
    try {
      await dispatch(sessionApi.endpoints.changePassword.initiate(body)).unwrap();
    } catch (error) {
      if (isRegisteredError(error)) {
        throw new ClientError(error.data.message as string);
      } else {
        throw new ServerError();
      }
    }
  },
);
