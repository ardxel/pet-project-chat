import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatEvents, chatSocket } from 'entities/chats';

interface EmitEditMessageBody {
  messageId: string;
  conversationId: string;
  text: string;
}

export const editMessageThunk = createAsyncThunk<EmitEditMessageBody, EmitEditMessageBody>('editMessage', (body) => {
  chatSocket.emit(ChatEvents.MESSAGE_UPDATE, body);
  return body;
});
