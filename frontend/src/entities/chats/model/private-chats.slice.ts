import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { editMessageThunk } from 'features/message@edit';
import { fetchMessages } from '../api';
import { handleAddConversation, handleAddConversationArray, handleAddMessage, handleAddMessageArray } from '../lib';
import { IConversation, IMessage, PrivateChatsMap } from './types';

interface ChatsState {
  privateChats: PrivateChatsMap;
  isConnected: boolean;
  userId?: string;
  openedChatId?: IMessage['conversationId'];
  isHiddenChat: boolean;
  editableMessage: IMessage | false;
  searchInput: string;
}

export const initialPrivateChatsState: ChatsState = {
  userId: undefined,
  privateChats: {},
  isConnected: false,
  openedChatId: undefined,
  isHiddenChat: true,
  editableMessage: false,
  searchInput: '',
};

export const privateChatsSlice = createSlice({
  name: 'privateChats',
  initialState: () => initialPrivateChatsState,
  reducers: {
    clearChatsData: () => {
      return initialPrivateChatsState;
    },

    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },

    setLastScrollPoint: (state, action: PayloadAction<{ chatId: string; point: number }>) => {
      if (state.privateChats[action.payload.chatId] && 'lastScrollPoint' in state.privateChats[action.payload.chatId]) {
        state.privateChats[action.payload.chatId].lastScrollPoint = action.payload.point;
      }
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

    setEditableMessage: (state, action: PayloadAction<IMessage | false>) => {
      state.editableMessage = action.payload;
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

    updateMessage: (state, action: PayloadAction<IMessage>) => {
      const { conversationId, _id } = action.payload;
      if (conversationId in state.privateChats) {
        const allMessages = state.privateChats[conversationId].messages;
        const index = allMessages.findIndex((msg) => msg._id === _id);
        if (index !== -1) {
          allMessages[index] = action.payload;
        }
      }
    },
    deleteMessage: (state, action: PayloadAction<{ conversationId: string; messageId: string }>) => {
      const { conversationId, messageId } = action.payload;

      if (conversationId in state.privateChats) {
        const chat = state.privateChats[conversationId];
        const index = chat.messages.findIndex((msg) => msg._id === messageId);

        chat.messages.splice(index, 1);
      }
    },
  },

  extraReducers(builder) {
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      const { conversationId, page } = action.payload;
      state.privateChats[conversationId].page = page ? page + 1 : 1;
    });
    builder.addCase(editMessageThunk.fulfilled, (state) => {
      console.log('CRAKA');
      state.editableMessage = false;
    });
  },
});

export const {
  addConversation,
  addMessages,
  addMessage,
  updateMessage,
  deleteMessage,
  setIsConnected,
  setUserId,
  clearChatsData,
  setOpenedChatId,
  setIsHiddenChat,
  setSearchInput,
  setLastScrollPoint,
  setEditableMessage,
} = privateChatsSlice.actions;

export const selectIsConnected = (state: RootState) => state.privateChats.isConnected;
export const selectPrivateChatList = (state: RootState) => state.privateChats.privateChats;
export const selectOpenedChatId = (state: RootState) => state.privateChats.openedChatId;
export const selectIsHiddenChat = (state: RootState) => state.privateChats.isHiddenChat;
export const selectSearchInput = (state: RootState) => state.privateChats.searchInput;
export const selectEditableMessage = (state: RootState) => state.privateChats.editableMessage;
export const selectOpenedChatData = createSelector(
  selectOpenedChatId,
  selectPrivateChatList,
  (chatId, chatList) => chatList[chatId],
);

export const selectChatDataByChatId = (chatId: string) => (state: RootState) => state.privateChats.privateChats[chatId];

export const selectOpenedChatHasAllMessages = createSelector(selectOpenedChatData, (chat) =>
  chat ? chat.isAllMessagesFetched : null,
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
  state.privateChats.privateChats[chatId] ? state.privateChats.privateChats[chatId].page : null;

export const selectPrivateChatLastScrollPoint = (chatId: string) => (state: RootState) =>
  state.privateChats.privateChats[chatId] ? state.privateChats.privateChats[chatId].lastScrollPoint : null;
