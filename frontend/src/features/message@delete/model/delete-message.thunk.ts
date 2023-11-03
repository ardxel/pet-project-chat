import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatEvents, chatSocket } from 'entities/chats';

interface EmitDeleteMessageBody {
  messageId: string;
  conversationId: string;
}

export const fetchDeleteMessage = createAsyncThunk<void, EmitDeleteMessageBody>('deleteMessage', (body) => {
  chatSocket.emit(ChatEvents.MESSAGE_DELETE, body);
});
