import { IConversation, IMessage } from '../model';

export const handleAddConversationArray = (state: RootState['chats'], payload: IConversation[]) => {
  if (payload.length === 0) return;
  for (const conversation of payload) {
    state.privateChats[conversation._id] = {
      /*
       * В документе хранится массив юзеров (members). Так как это приватная беседа,
       * в массиве всего 2 элемента: сам пользователь и собеседник.
       */
      companion: conversation.users.find((user) => user._id !== state.userId),
      messages: [],
    };
  }
};

export const handleAddConversation = (state: RootState['chats'], payload: IConversation) => {
  const { _id: conversationId, users } = payload;
  state.privateChats[conversationId] = {
    companion: users.find((user) => user._id !== state.userId),
    messages: [],
  };
};

export const handleAddMessageArray = (state: RootState['chats'], payload: IMessage[]) => {
  if (payload.length === 0) return;
  const conversationId = payload[0].conversationId;
  if (conversationId in state.privateChats) {
    state.privateChats[conversationId].messages.push(...payload);
  } else {
    state.privateChats[conversationId].messages = payload;
  }
};

export const handleAddMessage = (state: RootState['chats'], payload: IMessage) => {
  const { conversationId } = payload;
  if (conversationId in state.privateChats) {
    state.privateChats[conversationId]['messages'].push(payload);
  } else {
    state.privateChats[conversationId].messages = [payload];
  }
};
