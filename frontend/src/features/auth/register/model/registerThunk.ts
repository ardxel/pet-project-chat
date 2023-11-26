import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestRegisterBody, sessionApi } from 'entities/session';
import { isRegisteredError } from 'shared/api';
import { ClientError, ServerError } from 'shared/exceptions';

export const registerThunk = createAsyncThunk<void, RequestRegisterBody>(
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
