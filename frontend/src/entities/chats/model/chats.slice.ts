import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { handleAddConversation, handleAddConversationArray, handleAddMessage, handleAddMessageArray } from '../lib';
import { IConversation, IMessage, PrivateChatsMap, PublicChatsMap } from './types';

interface ChatsState {
  privateChats: PrivateChatsMap;
  publicChats: PublicChatsMap;
  isConnected: boolean;
  userId?: string;
  openedChatId?: IMessage['conversationId'];
  isHiddenChat: boolean;
  searchInput: string;
}

const initialChatsState: ChatsState = {
  userId: undefined,
  privateChats: {},
  publicChats: {},
  isConnected: false,
  openedChatId: undefined,
  isHiddenChat: true,
  searchInput: '',
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState: () => initialChatsState,
  reducers: {
    clearChatsData: () => {
      return initialChatsState;
    },

    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },

    setLastScrollPoint: (state, action: PayloadAction<{ chatId: string; point: number }>) => {
      if (state.privateChats[action.payload.chatId] && 'lastScrollPoint' in state.privateChats[action.payload.chatId]) {
        state.privateChats[action.payload.chatId].lastScrollPoint = action.payload.point;
      }
    },

    incrementPageCount: (state, action: PayloadAction<string>) => {
      const chatId = action.payload;
      state.privateChats[chatId].page += 1;
    },

    setOpenedChatId: (state, action: PayloadAction<IMessage['conversationId']>) => {
      state.openedChatId = action.payload;
    },

    setIsHiddenChat: (state, action: PayloadAction<boolean>) => {
      state.isHiddenChat = action.payload;
    },

    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },

    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },

    addConversation: (state, action: PayloadAction<IConversation | IConversation[]>) => {
      if (Array.isArray(action.payload)) {
        handleAddConversationArray(state, action.payload);
      } else {
        handleAddConversation(state, action.payload as IConversation);
      }
    },

    addMessages: (state, action: PayloadAction<{ conversationId: string; messages: IMessage[] }>) => {
      if (Array.isArray(action.payload.messages)) {
        handleAddMessageArray(state, action.payload);
      }
    },

    addMessage: (state, action: PayloadAction<{ conversationId: string; message: IMessage }>) => {
      handleAddMessage(state, action.payload);
    },
  },
});

export const {
  addConversation,
  addMessages,
  addMessage,
  setIsConnected,
  setUserId,
  clearChatsData,
  setOpenedChatId,
  setIsHiddenChat,
  setSearchInput,
  incrementPageCount,
  setLastScrollPoint,
} = chatsSlice.actions;

export const selectIsConnected = (state: RootState) => state.chats.isConnected;
export const selectPrivateChatList = (state: RootState) => state.chats.privateChats;
export const selectOpenedChatId = (state: RootState) => state.chats.openedChatId;
export const selectIsHiddenChat = (state: RootState) => state.chats.isHiddenChat;
export const selectSearchInput = (state: RootState) => state.chats.searchInput;

export const selectOpenedChatData = createSelector(
  selectOpenedChatId,
  selectPrivateChatList,
  (chatId, chatList) => chatList[chatId],
);

export const selectChatDataByChatId = (chatId: string) => (state: RootState) => state.chats.privateChats[chatId];

export const selectOpenedChatHasAllMessages = createSelector(selectOpenedChatData, (chat) =>
  chat ? chat.isFull : null,
);

export const selectConversationIdAndCompanionList = createSelector(selectPrivateChatList, (chats) =>
  chats ? Object.entries(chats).map(([conversationId, item]) => ({ conversationId, companion: item.companion })) : [],
);

export const selectOpenedChatCompanion = createSelector(selectOpenedChatId, selectPrivateChatList, (chatId, chats) => {
  const conversationId = Object.keys(chats).find((id) => id === chatId);
  return conversationId ? chats[conversationId].companion : null;
});

export const selectOpenedChatMessages = createSelector(selectOpenedChatData, (data) =>
  data ? data.messages : undefined,
);

export const selectPrivateChatLastPage = (chatId: string) => (state: RootState) =>
  state.chats.privateChats[chatId] ? state.chats.privateChats[chatId].page : null;

export const selectPrivateChatLastScrollPoint = (chatId: string) => (state: RootState) =>
  state.chats.privateChats[chatId] ? state.chats.privateChats[chatId].lastScrollPoint : null;
