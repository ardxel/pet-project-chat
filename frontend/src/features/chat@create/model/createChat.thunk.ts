import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatEvents, chatSocket } from 'entities/chats';

export const createPrivateChat = createAsyncThunk<void, string>('createConversation', (userId: string) => {
  chatSocket.emit(ChatEvents.CONVERSATION_CREATE, { invitedUserId: userId });
});
