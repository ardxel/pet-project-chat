import { createSelector, createSlice } from '@reduxjs/toolkit';
import { editMessageThunk } from 'features/message/edit';
import moment from 'moment';
import { privateChatReducers } from '../lib';
import { IMessage, PrivateChatsMap } from './types';

export interface PrivateChatsState {
  chats?: PrivateChatsMap;
  userId?: string;
  chatsExist: boolean;
  openedChatId?: IMessage['conversationId'];
  isHiddenChat: boolean;
  isHiddenOptions: boolean;
  editableMessage: IMessage | false;
  searchInput: string;
}

export const initialPrivateChatsState: PrivateChatsState = {
  userId: undefined,
  chats: {},
  chatsExist: false,
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

export const selectPrivateChatList = (state: RootState) => state.privateChats.chats;
export const selectOpenedChatId = (state: RootState) => state.privateChats.openedChatId;
export const selectIsHiddenChat = (state: RootState) => state.privateChats.isHiddenChat;
export const selectIsHiddenOptions = (state: RootState) => state.privateChats.isHiddenOptions;
export const selectSearchInput = (state: RootState) => state.privateChats.searchInput;
export const selectEditableMessage = (state: RootState) => state.privateChats.editableMessage;
export const selectChatDataByChatId = (chatId: string) => (state: RootState) => state.privateChats.chats[chatId];
export const selectPrivateChatsExist = (state: RootState) => state.privateChats.chatsExist;
export const selectOpenedChatMessages = (state: RootState) => {
  const openedChatId = state.privateChats.openedChatId;
  return openedChatId ? state.privateChats.chats[openedChatId].messages : undefined;
};

export const selectPrivateChatListSorted = createSelector(selectPrivateChatList, (chats) => {
  if (!chats) return [];
  return Object.entries(chats).sort(([, chatData1], [, chatData2]) => {
    const lastMessage1 = chatData1.messages.at(-1);
    const lastMessage2 = chatData2.messages.at(-1);

    const lastMessageTime1 = lastMessage1 ? moment(lastMessage1.createdAt) : null;
    const lastMessageTime2 = lastMessage2 ? moment(lastMessage2.createdAt) : null;

    if (lastMessageTime1 && lastMessageTime2) {
      return lastMessageTime2.diff(lastMessageTime1);
    }
    if (lastMessageTime1 && !lastMessageTime2) return 1;
    if (!lastMessageTime1 && lastMessageTime2) return -1;
    return 0;
  });
});

export const selectOpenedChatData = createSelector(
  selectOpenedChatId,
  selectPrivateChatList,
  (chatId, chatList) => chatList[chatId],
);

export const selectOpenedChatHasAllMessages = createSelector(selectOpenedChatData, (chat) =>
  chat ? chat.isAllMessagesFetched : null,
);

export const selectChatLastMessage = (chatId: string) =>
  createSelector(
    (state: RootState) => state.privateChats.chats[chatId],
    ({ messages }) => messages?.at(-1),
  );

export const selectOpenedChatMessagesLength = createSelector(selectOpenedChatMessages, (messages) => messages?.length);

export const selectConversationIdAndCompanionListSorted = createSelector(selectPrivateChatListSorted, (chats) =>
  chats.map(([conversationId, chatData]) => ({ conversationId, companion: chatData.companion })),
);

export const selectOpenedChatCompanion = createSelector(selectOpenedChatId, selectPrivateChatList, (chatId, chats) => {
  return chatId ? chats[chatId].companion : null;
});

export const selectCompanionStatusByChatId = (chatId?: string) =>
  createSelector(
    (state: RootState) => (chatId ? state.privateChats.chats[chatId] : undefined),
    (chat) => chat?.companionStatus,
  );
export const selectOpenedChatCompanionStatus = createSelector(selectOpenedChatData, (chat) => chat?.companionStatus);

export const selectPrivateChatLastPage = (chatId: string) => (state: RootState) =>
  state.privateChats.chats[chatId] ? state.privateChats.chats[chatId].page : null;

export const selectOpenedPrivateChatLastPage = createSelector(selectOpenedChatData, (chat) => chat?.page || 1);

export const selectOpenedChatIsLoading = createSelector(selectOpenedChatData, (data) => data?.isLoading);