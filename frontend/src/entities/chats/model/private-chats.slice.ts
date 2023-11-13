import { createSelector, createSlice } from '@reduxjs/toolkit';
import { editMessageThunk } from 'features/message/edit';
import { privateChatReducers } from '../lib';
import { IMessage, PrivateChatsMap } from './types';

export interface PrivateChatsState {
  chats?: PrivateChatsMap;
  isConnected: boolean;
  userId?: string;
  openedChatId?: IMessage['conversationId'];
  isHiddenChat: boolean;
  isHiddenOptions: boolean;
  editableMessage: IMessage | false;
  searchInput: string;
}

export const initialPrivateChatsState: PrivateChatsState = {
  userId: undefined,
  chats: {},
  isConnected: false,
  openedChatId: undefined,
  isHiddenChat: true,
  isHiddenOptions: true,
  editableMessage: false,
  searchInput: '',
};

export const privateChatsSlice = createSlice({
  name: 'privateChats',
  initialState: () => initialPrivateChatsState,
  reducers: privateChatReducers,
  extraReducers: (builder) => {
    builder.addCase(editMessageThunk.fulfilled, (state) => {
      state.editableMessage = false;
    });
  },
});

export const {
  addConversation,
  addConversationList,
  addMessageList,
  addMessage,
  updateMessage,
  deleteMessage,
  setIsConnected,
  setUserId,
  updateCompanionStatus,
  clearPrivateChatsData,
  setOpenedChatId,
  setIsHiddenChat,
  setIsHiddenOptions,
  setSearchInput,
  setIsLoading,
  setEditableMessage,
} = privateChatsSlice.actions;

export const selectIsConnected = (state: RootState) => state.privateChats.isConnected;
export const selectPrivateChatList = (state: RootState) => state.privateChats.chats;
export const selectOpenedChatId = (state: RootState) => state.privateChats.openedChatId;
export const selectIsHiddenChat = (state: RootState) => state.privateChats.isHiddenChat;
export const selectIsHiddenOptions = (state: RootState) => state.privateChats.isHiddenOptions;
export const selectSearchInput = (state: RootState) => state.privateChats.searchInput;
export const selectEditableMessage = (state: RootState) => state.privateChats.editableMessage;
export const selectChatDataByChatId = (chatId: string) => (state: RootState) => state.privateChats.chats[chatId];
export const selectOpenedChatMessages = (state: RootState) => {
  const openedChatId = state.privateChats.openedChatId;
  return openedChatId ? state.privateChats.chats[openedChatId].messages : undefined;
};

export const selectOpenedChatData = createSelector(
  selectOpenedChatId,
  selectPrivateChatList,
  (chatId, chatList) => chatList[chatId],
);

export const selectOpenedChatHasAllMessages = createSelector(selectOpenedChatData, (chat) =>
  chat ? chat.isAllMessagesFetched : null,
);

export const selectChatLastMessage = (chatId: string) =>
  createSelector(selectChatDataByChatId(chatId), ({ messages }) => (messages?.length ? messages.at(-1) : undefined));

export const selectOpenedChatMessagesLength = createSelector(selectOpenedChatMessages, (messages) => messages?.length);

export const selectConversationIdAndCompanionList = createSelector(selectPrivateChatList, (chats) =>
  chats ? Object.entries(chats).map(([conversationId, item]) => ({ conversationId, companion: item.companion })) : [],
);

export const selectOpenedChatCompanion = createSelector(selectOpenedChatId, selectPrivateChatList, (chatId, chats) => {
  return chatId ? chats[chatId].companion : null;
});

export const selectCompanionStatusByChatId = (chatId: string) =>
  createSelector(
    (state: RootState) => state.privateChats.chats[chatId],
    (chat) => chat?.companionStatus,
  );
export const selectOpenedChatCompanionStatus = createSelector(selectOpenedChatData, (chat) => chat?.companionStatus);

export const selectPrivateChatLastPage = (chatId: string) => (state: RootState) =>
  state.privateChats.chats[chatId] ? state.privateChats.chats[chatId].page : null;

export const selectOpenedPrivateChatLastPage = createSelector(selectOpenedChatData, (chat) => chat?.page || 1);

export const selectOpenedChatIsLoading = createSelector(selectOpenedChatData, (data) => data?.isLoading);
