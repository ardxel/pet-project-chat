import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatEvents } from '../model';
import { chatSocket } from './socket.instance';

export interface FetchMessagesBody {
  limit?: number;
  page?: number;
  conversationId: string;
}
export const fetchMessages = createAsyncThunk<
  FetchMessagesBody,
  FetchMessagesBody,
  { state: RootState; dispatch: AppDispatch }
>('fetchMessages', (body) => {
  chatSocket.emit(ChatEvents.MESSAGE_FETCH, body);
  return body;
});

export const fetchConversations = createAsyncThunk('fetchConversations', () => {
  chatSocket.emit(ChatEvents.CONVERSATION_FETCH);
});
