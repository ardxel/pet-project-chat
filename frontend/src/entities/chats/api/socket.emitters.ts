import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatEvents, setIsLoading } from '../model';
import { chatSocket } from './socket.instance';

export interface FetchMessagesBody {
  limit?: number;
  page?: number;
  conversationId: string;
}
export const fetchMessages = createAsyncThunk<void, FetchMessagesBody, { dispatch: AppDispatch }>(
  'fetchMessages',
  (body, { dispatch }) => {
    dispatch(setIsLoading({ chatId: body.conversationId, isLoading: true }));
    chatSocket.emit(ChatEvents.MESSAGE_FETCH, body);
  },
);

export const fetchConversations = createAsyncThunk('fetchConversations', () => {
  chatSocket.emit(ChatEvents.CONVERSATION_FETCH);
});
