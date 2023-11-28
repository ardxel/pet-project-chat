import { createAsyncThunk } from '@reduxjs/toolkit';
import { IUser, sessionApi } from 'entities/session';

export const editFullnameThunk = createAsyncThunk(
  'editFullname',
  async (body: Pick<IUser, '_id' | 'firstName' | 'lastName'>, { dispatch }) => {
    try {
      await dispatch(sessionApi.endpoints.update.initiate(body)).unwrap();
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
