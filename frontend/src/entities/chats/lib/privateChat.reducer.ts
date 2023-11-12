import { PayloadAction } from '@reduxjs/toolkit';
import {
  ConversationStatus,
  IConversation,
  IMessage,
  PrivateChatsMap,
  PrivateChatsState,
  initialPrivateChatsState,
} from '../model';

export const privateChatReducers = {
  clearPrivateChatsData: () => {
    return initialPrivateChatsState;
  },

  setIsLoading: (state: PrivateChatsState, action: PayloadAction<{ chatId: string; isLoading: boolean }>) => {
    const { chatId, isLoading } = action.payload;

    if (chatId in state.privateChats) {
      state.privateChats[chatId].isLoading = isLoading;
    }
  },

  setSearchInput: (state: PrivateChatsState, action: PayloadAction<string>) => {
    state.searchInput = action.payload;
  },

  setOpenedChatId: (state: PrivateChatsState, action: PayloadAction<IMessage['conversationId']>) => {
    state.openedChatId = action.payload;
  },

  setIsHiddenChat: (state: PrivateChatsState, action: PayloadAction<boolean>) => {
    state.isHiddenChat = action.payload;
  },

  setIsHiddenOptions: (state: PrivateChatsState, action: PayloadAction<boolean>) => {
    state.isHiddenOptions = action.payload;
  },

  setIsConnected: (state: PrivateChatsState, action: PayloadAction<boolean>) => {
    state.isConnected = action.payload;
  },

  setUserId: (state: PrivateChatsState, action: PayloadAction<string>) => {
    state.userId = action.payload;
  },

  setEditableMessage: (state: PrivateChatsState, action: PayloadAction<IMessage | false>) => {
    state.editableMessage = action.payload;
  },

  addConversationList: (
    state: PrivateChatsState,
    action: PayloadAction<{ data: IConversation; status: ConversationStatus }[]>,
  ) => {
    if (action.payload.length === 0) return;
    for (const conversation of action.payload) {
      const chat: Omit<PrivateChatsMap[string], 'companion'> = {
        messages: [],
        page: 1,
        isCompanionActive: false,
        isAllMessagesFetched: false,
        isLoading: false,
        companionStatus: 'offline',
        status: conversation.status,
      };
      if (conversation.data.isPrivate) {
        /*
         * В документе хранится массив юзеров (members). Так как это приватная беседа,
         * в массиве всего 2 элемента: сам пользователь и собеседник.
         */
        const companion = conversation.data.users.find((user) => user._id !== state.userId);
        state.privateChats[conversation.data._id] = { ...chat, companion };
      }
    }
  },

  addConversation: (state: PrivateChatsState, action: PayloadAction<IConversation>) => {
    const { _id: conversationId, users, isPrivate } = action.payload;
    const chat: Omit<PrivateChatsMap[string], 'companion'> = {
      messages: [],
      page: 1,
      isCompanionActive: false,
      isAllMessagesFetched: false,
      isLoading: false,
      companionStatus: 'offline',
      status: 'common',
    };
    if (isPrivate) {
      const companion = users.find((user) => user._id !== state.userId);
      state.privateChats[conversationId] = { ...chat, companion };
    } else {
      throw new Error('Is not private conversation');
    }
  },

  addMessageList: (
    state: PrivateChatsState,
    action: PayloadAction<{ conversationId: string; messages: IMessage[] }>,
  ) => {
    const { conversationId, messages } = action.payload;
    const isAllMessagesFetched = messages.length === 0;

    if (isAllMessagesFetched) {
      state.privateChats[conversationId].page += 1;
      state.privateChats[conversationId].isAllMessagesFetched = true;
      state.privateChats[conversationId].isLoading = false;
      return;
    }

    state.privateChats[conversationId].page += 1;
    state.privateChats[conversationId].messages = messages.concat(state.privateChats[conversationId].messages);
    state.privateChats[conversationId].isLoading = false;
  },

  addMessage: (state: PrivateChatsState, action: PayloadAction<{ conversationId: string; message: IMessage }>) => {
    const { conversationId, message } = action.payload;
    if (conversationId in state.privateChats) {
      state.privateChats[conversationId].messages.push(message);
    } else {
      state.privateChats[conversationId].messages = [message];
    }
  },

  updateMessage: (state: PrivateChatsState, action: PayloadAction<IMessage>) => {
    const { conversationId, _id } = action.payload;
    if (conversationId in state.privateChats) {
      const allMessages = state.privateChats[conversationId].messages;
      const index = allMessages.findIndex((msg) => msg._id === _id);
      if (index !== -1) {
        allMessages[index] = action.payload;
      }
    }
  },

  deleteMessage: (state: PrivateChatsState, action: PayloadAction<{ conversationId: string; messageId: string }>) => {
    const { conversationId, messageId } = action.payload;

    if (conversationId in state.privateChats) {
      const chat = state.privateChats[conversationId];
      const index = chat.messages.findIndex((msg) => msg._id === messageId);
      chat.messages.splice(index, 1);
    }
  },
};
