import { createSelector, createSlice } from '@reduxjs/toolkit';
import { IMessage, messageUtils } from 'entities/message';
import { editMessageThunk } from 'features/message/edit';
import moment from 'moment';
import { chatsApi } from '../api';
import { privateChatReducers } from '../lib';
import { PrivateChatsMap } from './types';

export interface PrivateChatsState {
  chats?: PrivateChatsMap;
  userId?: string;
  chatsExist: boolean; // проверка первой инициализации чатов с бекенде при входе в приложение
  openedChatId?: IMessage['conversationId'];
  editableMessage: IMessage | false;
  searchChatInput: string;
  selectedIndex?: number; // выбранный индекс при поиске сообщения в messageSearchBar (временно удален)
}

export const initialPrivateChatsState: PrivateChatsState = {
  userId: undefined,
  chats: {},
  chatsExist: false,
  openedChatId: undefined,
  editableMessage: false,
  searchChatInput: '',
  selectedIndex: undefined, //TODO временно не используется
};

export const ignoredPrivateChatsStateKeys = ['selectedIndex'];

export const privateChatsSlice = createSlice({
  name: 'privateChats',
  initialState: () => initialPrivateChatsState,
  reducers: privateChatReducers,
  extraReducers: (builder) => {
    builder.addCase(editMessageThunk.fulfilled, (state) => {
      state.editableMessage = false;
    });
    builder.addMatcher(chatsApi.endpoints.changeChatStatus.matchFulfilled, (state, action) => {
      const { conversationId, status } = action.payload;

      if (conversationId in state.chats) {
        state.chats[conversationId].status = status;
      }
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
  setSearchChatInput,
  setIsLoading,
  setEditableMessage,
} = privateChatsSlice.actions;

type SelectorWithUndefined<T> = (state: RootState) => T | undefined;

export const selectPrivateChatList = (state: RootState) => state.privateChats.chats;
export const selectOpenedChatId = (state: RootState) => state.privateChats.openedChatId;
export const selectSearchChatInput = (state: RootState) => state.privateChats.searchChatInput;
export const selectEditableMessage = (state: RootState) => state.privateChats.editableMessage;
export const selectChatDataByChatId = (chatId: string) => (state: RootState) => state.privateChats.chats[chatId];
export const selectPrivateChatsExist = (state: RootState) => state.privateChats.chatsExist;
export const selectSelectedMessageIndex = (state: RootState) => state.privateChats.selectedIndex;
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

export const selectOpenedChatData = createSelector(selectOpenedChatId, selectPrivateChatList, (chatId, chatList) =>
  chatList[chatId] ? chatList[chatId] : undefined,
);

export const selectOpenedChatHasAllMessages = createSelector(selectOpenedChatData, (chat) =>
  chat ? chat.isAllMessagesFetched : null,
);

export const selectChatLastMessage = (chatId: string) =>
  createSelector(
    (state: RootState) => state.privateChats.chats[chatId],
    ({ messages }) => messages.findLast((msg) => messageUtils.getType(msg) === 'text'),
  );

export const selectOpenedChatMessagesLength = createSelector(selectOpenedChatMessages, (messages) => messages?.length);

export const selectConversationIdAndCompanionListSorted = createSelector(selectPrivateChatListSorted, (chats) =>
  chats.map(([conversationId, chatData]) => ({
    conversationId,
    companion: chatData.companion,
    chatStatus: chatData.status,
    companionStatus: chatData.companionStatus,
  })),
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

export const selectChatIdByCompanionId = (companionId: string) =>
  createSelector(selectPrivateChatList, (chatMap): string | undefined => {
    for (const chatId in chatMap) {
      if (chatMap[chatId].companion._id === companionId) {
        return chatId;
      }
    }
  });
