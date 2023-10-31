import { ChatSocketListener, selectIsConnected } from 'entities/chats';
import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { createCallbackHandlers } from './socket.callbacks';

export const useChatSocketListeners = () => {
  const socketListener = useRef(new ChatSocketListener());
  const isConnected = useAppSelector(selectIsConnected);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isConnected) {
      socketListener.current.removeAll(); // Удалить все слушатели, если не подключено
      return;
    }

    const eventCallbacks = createCallbackHandlers(dispatch);

    for (const event in eventCallbacks) {
      socketListener.current.set(event, eventCallbacks[event]);
    }

    socketListener.current.listenAll();

    return () => {
      socketListener.current.removeAll(); // Удалить все слушатели при размонтировании компонента
    };
  }, [isConnected]);

  return socketListener.current;
};
