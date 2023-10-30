import {
  ChatClientErrorEvents,
  ChatEvents,
  IConversation,
  IMessage,
  addConversation,
  addMessage,
  addMessages,
  chatSocket,
  selectIsConnected,
  setUserId,
} from 'entities/chats';
import { IUser } from 'entities/session';
import { logoutThunk } from 'features/auth/logout';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';

interface MessagesDTO {
  messages: IMessage[];
  conversationId: string;
}

interface MessageDTO {
  message: IMessage;
  conversationId: string;
}

export const useChatSocketListeners = () => {
  const isConnected = useAppSelector(selectIsConnected);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isConnected) {
      return offListeners();
    }

    const onUserInit = (data: IUser) => dispatch(setUserId(data._id));
    const onConversationCreate = (data: IConversation) => dispatch(addConversation(data));
    const onConversationFetch = (data: IConversation[]) => dispatch(addConversation(data));
    const onMessageCreate = (data: MessageDTO) => dispatch(addMessage(data));
    const onMessageFetch = (data: MessagesDTO) => dispatch(addMessages(data));

    const onInvalidateToken = () => {
      dispatch(logoutThunk());
    };

    chatSocket.on(ChatEvents.USER_INIT, onUserInit);
    chatSocket.on(ChatEvents.CONVERSATION_CREATE, onConversationCreate);
    chatSocket.on(ChatEvents.CONVERSATION_FETCH, onConversationFetch);
    chatSocket.on(ChatEvents.MESSAGE_CREATE, onMessageCreate);
    chatSocket.on(ChatEvents.MESSAGE_FETCH, onMessageFetch);

    chatSocket.on(ChatClientErrorEvents.INVALID_TOKEN, onInvalidateToken);

    function offListeners() {
      chatSocket.off(ChatEvents.USER_INIT, onUserInit);
      chatSocket.off(ChatEvents.CONVERSATION_CREATE, onConversationCreate);
      chatSocket.off(ChatEvents.CONVERSATION_FETCH, onConversationFetch);
      chatSocket.off(ChatEvents.MESSAGE_CREATE, onMessageCreate);
      chatSocket.off(ChatEvents.MESSAGE_FETCH, onMessageFetch);

      chatSocket.off(ChatClientErrorEvents.INVALID_TOKEN, onInvalidateToken);
    }

    return () => {
      offListeners();
    };
  }, [isConnected]);
};
