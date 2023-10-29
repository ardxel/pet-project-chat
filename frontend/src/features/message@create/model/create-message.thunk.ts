import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatEvents, chatSocket } from 'entities/chats';

export interface ResponseCreateMessageBody {
  sender: string;
  conversationId: string;
  text: string;
}

export const fetchCreateMessage = createAsyncThunk<void, ResponseCreateMessageBody>('createMessage', async (body) => {
  await chatSocket.emit(ChatEvents.MESSAGE_CREATE, body);
});
