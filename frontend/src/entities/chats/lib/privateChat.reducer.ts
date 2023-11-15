import { PayloadAction } from '@reduxjs/toolkit';
import {
  CompanionStatus,
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

    if (chatId in state.chats) {
      state.chats[chatId].isLoading = isLoading;
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

  setUserId: (state: PrivateChatsState, action: PayloadAction<string>) => {
    state.userId = action.payload;
  },

  setEditableMessage: (state: PrivateChatsState, action: PayloadAction<IMessage | false>) => {
    state.editableMessage = action.payload;
  },

  updateCompanionStatus: (
    state: PrivateChatsState,
    action: PayloadAction<{ userId: string; conversationId: string; status: CompanionStatus }>,
  ) => {
    const { conversationId, status, userId } = action.payload;
    if (state.chats[conversationId] && state.chats[conversationId].companion._id === userId) {
      state.chats[conversationId].companionStatus = status;
    }
  },

  addConversationList: (
    state: PrivateChatsState,
    action: PayloadAction<{ data: IConversation; status: ConversationStatus }[]>,
  ) => {
    if (action.payload.length === 0) return;
    for (const conversation of action.payload) {
      if (state.chats[conversation.data._id]) continue;

      const chat: Omit<PrivateChatsMap[string], 'companion'> = {
        messages: [],
        page: 1,
        isAllMessagesFetched: false,
        isLoading: false,
        companionStatus: 'offline',
        status: conversation.status,
      };
      if (conversation.data.isPrivate) {
        /*
         * В документе хранится массив состоящий из 2 юзеров (members). Так как это приватная беседа,
         */
        const companion = conversation.data.users.find((user) => user._id !== state.userId);
        state.chats[conversation.data._id] = { ...chat, companion };
      }
    }
    state.chatsExist = true;
  },

  addConversation: (state: PrivateChatsState, action: PayloadAction<IConversation>) => {
    const { _id: conversationId, users, isPrivate } = action.payload;
    const chat: Omit<PrivateChatsMap[string], 'companion'> = {
      messages: [],
      page: 1,
      isAllMessagesFetched: false,
      isLoading: false,
      companionStatus: 'offline',
      status: 'common',
    };
    if (isPrivate) {
      const companion = users.find((user) => user._id !== state.userId);
      state.chats[conversationId] = { ...chat, companion };
    } else {
      throw new Error('Is not private conversation');
    }
  },

  addMessageList: (
    state: PrivateChatsState,
    action: PayloadAction<{ conversationId: string; messages: IMessage[] }>,
  ) => {
    const { conversationId, messages } = action.payload;
    const emptyMessageArray = messages.length === 0;

    if (emptyMessageArray) {
      state.chats[conversationId].page += 1;
      state.chats[conversationId].isAllMessagesFetched = true;
      state.chats[conversationId].isLoading = false;
      return;
    }

    state.chats[conversationId].page += 1;
    state.chats[conversationId].messages = messages.concat(state.chats[conversationId].messages);
    state.chats[conversationId].isLoading = false;
  },

  addMessage: (state: PrivateChatsState, action: PayloadAction<{ conversationId: string; message: IMessage }>) => {
    const { conversationId, message } = action.payload;
    if (conversationId in state.chats) {
      state.chats[conversationId].messages.push(message);
    } else {
      state.chats[conversationId].messages = [message];
    }
  },

  updateMessage: (state: PrivateChatsState, action: PayloadAction<IMessage>) => {
    const { conversationId, _id } = action.payload;
    if (conversationId in state.chats) {
      const allMessages = state.chats[conversationId].messages;
      const index = allMessages.findIndex((msg) => msg._id === _id);
      if (index !== -1) {
        allMessages[index] = action.payload;
      }
    }
  },

  deleteMessage: (state: PrivateChatsState, action: PayloadAction<{ conversationId: string; messageId: string }>) => {
    const { conversationId, messageId } = action.payload;

    if (conversationId in state.chats) {
      const chat = state.chats[conversationId];
      const index = chat.messages.findIndex((msg) => msg._id === messageId);
      chat.messages.splice(index, 1);
    }
  },
};
