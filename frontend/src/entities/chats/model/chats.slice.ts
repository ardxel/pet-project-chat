import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { IUser } from 'entities/session';
import { IConversation, IMessage } from './types';

interface ChatsState {
  chats: Record<IMessage['conversationId'], { companions: IUser[]; messages: IMessage[] }>;
  isConnected: boolean;
  userId?: string;
}

const initialChatsState: ChatsState = {
  userId: undefined,
  chats: {},
  isConnected: false,
};

export const chatsSlice = createSlice({
  name: 'chats',
  initialState: initialChatsState,
  reducers: {
    setIsConnected: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    addConversation: (state, action: PayloadAction<IConversation | IConversation[]>) => {
      if (Array.isArray(action.payload) && action.payload.length > 0) {
        for (const conversation of action.payload) {
          state.chats[conversation._id] = {
            companions: conversation.users.filter((user) => user._id !== state.userId),
            messages: conversation.messages,
          };
        }
        return;
      }

      const { _id: conversationId, messages, users } = action.payload as IConversation;
      state.chats[conversationId] = {
        companions: users.filter((user) => user._id !== state.userId),
        messages,
      };
    },

    addMessage: (state, action: PayloadAction<IMessage>) => {
      const { conversationId } = action.payload;

      if (conversationId in state.chats) {
        state.chats[conversationId]['messages'].push(action.payload);
      } else {
        state.chats[conversationId]['messages'] = [action.payload];
      }
    },
  },
});

export const { addConversation, addMessage, setIsConnected, setUserId } = chatsSlice.actions;

export const selectChatList = (state: RootState) => state.chats.chats;
export const selectChatCompanions = createSelector(selectChatList, (chats) =>
  Object.values(chats).map((item) => (item.companions.length > 1 ? item.companions : item.companions[0])),
);
