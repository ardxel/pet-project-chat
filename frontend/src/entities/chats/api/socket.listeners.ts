import {
  ChatEvents,
  IConversation,
  IMessage,
  addConversation,
  addMessage,
  chatSocket,
  setUserId,
} from 'entities/chats';
import { IUser } from 'entities/session';
import { useEffect } from 'react';
import { useAppDispatch } from 'shared/model';

export const useChatSocketListeners = () => {
  const dispatch = useAppDispatch();
  const connected = Boolean(chatSocket);

  useEffect(() => {
    if (!connected) return;

    chatSocket.on(ChatEvents.USER_INIT, (data: IUser) => {
      dispatch(setUserId(data._id));
    });

    chatSocket.on(ChatEvents.CONVERSATION_FETCH, (data: IConversation | IConversation[]) => {
      console.log(data);
      dispatch(addConversation(data));
    });

    chatSocket.on(ChatEvents.MESSAGE_CREATE, (data: IMessage) => {
      console.log(data);
      dispatch(addMessage(data));
    });
  }, []);
};
