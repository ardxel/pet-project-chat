import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { IUser } from 'entities/session';
import { handleAddConversation, handleAddConversationArray, handleAddMessage, handleAddMessageArray } from '../lib';
import { IConversation, IMessage } from './types';

interface ChatsState {
  privateChats: Record<string, { companion: IUser; messages: IMessage[] }>;
  publicChats: Record<string, { companions: IUser[]; messages: IMessage[] }>;
  isConnected: boolean;
  userId?: string;
  openedChatId?: IMessage['conversationId'];
  isHiddenChat: boolean;
}

const initialChatsState: ChatsState = {
  userId: undefined,
  privateChats: {},
  publicChats: {},
  isConnected: false,
  openedChatId: undefined,
  isHiddenChat: true,
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState: initialChatsState,
  reducers: {
    clearChatsData: () => {
      return initialChatsState;
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

    addPrivateConversation: (state, action: PayloadAction<IConversation | IConversation[]>) => {
      if (Array.isArray(action.payload)) {
        handleAddConversationArray(state, action.payload);
      } else {
        handleAddConversation(state, action.payload as IConversation);
      }
    },

    addPrivateMessages: (state, action: PayloadAction<IMessage | IMessage[]>) => {
      if (Array.isArray(action.payload)) {
        handleAddMessageArray(state, action.payload);
      } else {
        handleAddMessage(state, action.payload as IMessage);
      }
    },
  },
});

export const {
  addPrivateConversation,
  addPrivateMessages,
  setIsConnected,
  setUserId,
  clearChatsData,
  setOpenedChatId,
  setIsHiddenChat,
} = chatsSlice.actions;

export const selectIsConnected = (state: RootState) => state.chats.isConnected;
export const selectPrivateChatList = (state: RootState) => state.chats.privateChats;
export const selectOpenedChatId = (state: RootState) => state.chats.openedChatId;
export const selectIsHiddenChat = (state: RootState) => state.chats.isHiddenChat;
export const selectOpenedChatData = createSelector(
  selectOpenedChatId,
  selectPrivateChatList,
  (chatId, chatList) => chatList[chatId],
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
