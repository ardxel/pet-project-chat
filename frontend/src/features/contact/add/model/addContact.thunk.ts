import { createAsyncThunk } from '@reduxjs/toolkit';
import { AddContactDto, contactsApi } from 'entities/contacts';

export const addContactThunk = createAsyncThunk<void, AddContactDto>('addContact', async (body, { dispatch }) => {
  await dispatch(contactsApi.endpoints.addContact.initiate(body));
});
