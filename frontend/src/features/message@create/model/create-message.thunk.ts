import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatEvents, chatSocket } from 'entities/chats';

export interface EmitCreateMessageBody {
  sender: string;
  conversationId: string;
  text: string;
}

export const createMessageThunk = createAsyncThunk<void, EmitCreateMessageBody>('createMessage', async (body) => {
  await chatSocket.emit(ChatEvents.MESSAGE_CREATE, body);
});
