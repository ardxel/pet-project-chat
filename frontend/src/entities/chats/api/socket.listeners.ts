import { ChatSocketListener } from 'entities/chats';
import { selectSocketStatus } from 'entities/session';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { createCallbackHandlers } from './socket.callbacks';

export const useChatSocketListeners = () => {
  const socketListener = useRef(new ChatSocketListener());
  const connectionStatus = useAppSelector(selectSocketStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (connectionStatus === 'stop') {
      socketListener.current.removeAll(); // Удалить все слушатели, если не подклю чено
      return;
    }

    Object.entries(createCallbackHandlers(dispatch)).forEach(([event, cb]) => {
      socketListener.current.set(event, cb);
    });

    socketListener.current.listenAll();

    return () => {
      socketListener.current.removeAll(); // Удалить все слушатели при размонтировании компонента
    };
  }, [connectionStatus]);

  return socketListener.current;
};
