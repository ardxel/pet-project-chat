import { createAsyncThunk } from '@reduxjs/toolkit';
import { contactsApi } from 'entities/contacts';
import { isRegisteredError } from 'shared/api';
import { ClientError, ServerError } from 'shared/exceptions';

export const fetchContacts = createAsyncThunk<void, string>(
  'contacts/fetchContacts',
  async (userId: string, { dispatch }) => {
    try {
      dispatch(contactsApi.endpoints.getContacts.initiate(userId));
    } catch (error) {
      if (isRegisteredError(error)) {
        throw new ClientError('Неверно указаны данные.');
      } else {
        throw new ServerError('Ошибка сервера. Повторите еще раз.');
      }
    }
  },
);
