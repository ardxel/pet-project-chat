import { IConversation, IMessage } from '../model';

export const handleAddConversationArray = (state: RootState['chats'], payload: IConversation[]) => {
  if (payload.length === 0) return;
  for (const conversation of payload) {
    const chat = {
      messages: [],
      page: 1,
      limit: 25,
      isFull: false,
    };
    if (conversation.isPrivate) {
      /*
       * В документе хранится массив юзеров (members). Так как это приватная беседа,
       * в массиве всего 2 элемента: сам пользователь и собеседник.
       */
      const companion = conversation.users.find((user) => user._id !== state.userId);
      state.privateChats[conversation._id] = { ...chat, companion };
    } else {
      const companions = conversation.users.filter((user) => user._id !== state.userId);
      state.publicChats[conversation._id] = { ...chat, companions };
    }
  }
};

export const handleAddConversation = (state: RootState['chats'], payload: IConversation) => {
  const { _id: conversationId, users, isPrivate } = payload;
  const chat = {
    messages: [],
    page: 1,
    limit: 25,
    isFull: false,
  };
  if (isPrivate) {
    const companion = users.find((user) => user._id !== state.userId);
    state.privateChats[conversationId] = { ...chat, companion };
  } else {
    const companions = users.filter((user) => user._id !== state.userId);
    state.publicChats[conversationId] = { ...chat, companions };
  }
};

export const handleAddMessageArray = (
  state: RootState['chats'],
  payload: { conversationId: string; messages: IMessage[] },
) => {
  if (payload.messages.length === 0) {
    state.privateChats[payload.conversationId].isFull = true;
    return;
  }
  const conversationId = payload.conversationId;
  const messages = payload.messages;
  if (conversationId in state.privateChats) {
    state.privateChats[conversationId].messages.unshift(...messages);
  } else {
    state.privateChats[conversationId].messages = messages;
  }
};

export const handleAddMessage = (state: RootState['chats'], payload: { conversationId: string; message: IMessage }) => {
  const { conversationId, message } = payload;
  if (conversationId in state.privateChats) {
    state.privateChats[conversationId]['messages'].push(message);
  } else {
    state.privateChats[conversationId].messages = [message];
  }
};
