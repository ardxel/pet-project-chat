import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatEvents } from '../model';
import { chatSocket } from './socket.instance';

export interface ResponseMessagesBody {
  limit?: number;
  page?: number;
  conversationId: string;
}

export const fetchConversations = createAsyncThunk('fetchConversations', () => {
  chatSocket.emit(ChatEvents.CONVERSATION_FETCH);
});

export const fetchMessages = createAsyncThunk<void, ResponseMessagesBody, { state: RootState; dispatch: AppDispatch }>(
  'fetchMessages',
  (body) => {
    chatSocket.emit(ChatEvents.MESSAGE_FETCH, body);
  },
);
