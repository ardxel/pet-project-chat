import { createAsyncThunk } from '@reduxjs/toolkit';
import { sessionApi } from 'entities/session/api/sessionApi';
import { isRegisteredError } from 'shared/api';
import { ClientError, ServerError } from 'shared/exceptions';

export const registrThunk = createAsyncThunk<void, { email: string; password: string; name: string }>(
  'authentication/registration',
  async (body, { dispatch }) => {
    try {
      await dispatch(sessionApi.endpoints.register.initiate(body)).unwrap();
    } catch (error: unknown) {
      if (isRegisteredError(error)) {
        throw new ClientError(error.data.message as string);
      } else {
        throw new ServerError();
      }
    }
  },
);
