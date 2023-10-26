import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatEvents } from '../model';
import { chatSocket } from './socket.instance';

export const fetchConversations = createAsyncThunk('fetchConversations', async (_, { dispatch }) => {
  await chatSocket.emit(ChatEvents.CONVERSATION_FETCH, {});
});
