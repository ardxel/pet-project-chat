import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResponseChangeChatStatusBody, chatsApi } from 'entities/chats';

export const changeChatStatusThunk = createAsyncThunk(
  'changeChatStatus',
  async (body: ResponseChangeChatStatusBody, { dispatch }) => {
    try {
      await dispatch(chatsApi.endpoints.changeChatStatus.initiate(body)).unwrap();
    } catch (error) {
      console.log(error);
      return error;
    }
  },
);
