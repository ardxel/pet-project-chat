import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, sessionApi } from 'entities/session';
import { isRegisteredError } from 'shared/api';
import { ClientError, ServerError } from 'shared/exceptions';

export const changeEmailThunk = createAsyncThunk(
  'changeEmail',
  async (body: Pick<IUser, '_id' | 'email'>, { dispatch }) => {
    try {
      await dispatch(sessionApi.endpoints.update.initiate(body)).unwrap();
    } catch (error) {
      if (isRegisteredError(error)) {
        throw new ClientError(error.data.message as string);
      } else {
        throw new ServerError();
      }
    }
  },
);
