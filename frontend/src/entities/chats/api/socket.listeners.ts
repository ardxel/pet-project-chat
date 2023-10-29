import {
  ChatEvents,
  IConversation,
  IMessage,
  addPrivateConversation,
  addPrivateMessages,
  chatSocket,
  selectIsConnected,
  setUserId,
} from 'entities/chats';
import { IUser } from 'entities/session';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';

export const useChatSocketListeners = () => {
  const isConnected = useAppSelector(selectIsConnected);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isConnected) {
      return offListeners();
    }

    const onUserInit = (data: IUser) => dispatch(setUserId(data._id));
    const onPrivateConversationFetch = (data: IConversation | IConversation[]) =>
      dispatch(addPrivateConversation(data));
    const onMessageCreate = (data: IMessage) => dispatch(addPrivateMessages(data));
    const onMessageFetch = (data: IMessage[]) => dispatch(addPrivateMessages(data));

    chatSocket.on(ChatEvents.USER_INIT, onUserInit);
    chatSocket.on(ChatEvents.CONVERSATION_FETCH, onPrivateConversationFetch);
    chatSocket.on(ChatEvents.MESSAGE_CREATE, onMessageCreate);
    chatSocket.on(ChatEvents.MESSAGE_FETCH, onMessageFetch);

    function offListeners() {
      chatSocket.off(ChatEvents.USER_INIT, onUserInit);
      chatSocket.off(ChatEvents.CONVERSATION_FETCH, onPrivateConversationFetch);
      chatSocket.off(ChatEvents.MESSAGE_CREATE, onMessageCreate);
      chatSocket.off(ChatEvents.MESSAGE_FETCH, onMessageFetch);
    }

    return () => {
      offListeners();
    };
  }, [isConnected]);
};
