import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestLoginBody, sessionApi } from 'entities/session';
import { isRegisteredError } from 'shared/api';
import { ClientError, ServerError } from 'shared/exceptions';

export const loginThunk = createAsyncThunk<void, RequestLoginBody>(
  'authentication/login',
  async (body, { dispatch }) => {
    try {
      await dispatch(sessionApi.endpoints.login.initiate(body)).unwrap();
    } catch (error) {
      if (isRegisteredError(error)) {
        throw new ClientError(error.data.message as string);
      } else {
        throw new ServerError();
      }
    }
  },
);
