import { createAsyncThunk } from '@reduxjs/toolkit';
import { DeleteContactDto, contactsApi } from 'entities/contacts';

export const deleteContactThunk = createAsyncThunk('deleteContact', async (body: DeleteContactDto, { dispatch }) => {
  await dispatch(contactsApi.endpoints.deleteContact.initiate(body));
});
