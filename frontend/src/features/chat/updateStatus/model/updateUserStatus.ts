import { createAsyncThunk } from '@reduxjs/toolkit';
import { ChatEvents, chatSocket } from 'entities/chats';
import { UpdateCompanionStatusDto } from 'entities/chats/api/socket.callbacks';

export const updateUserStatusInChat = createAsyncThunk('updateUserStatusInChat', (dto: UpdateCompanionStatusDto) => {
  chatSocket.emit(ChatEvents.USER_STATUS, dto);
});
