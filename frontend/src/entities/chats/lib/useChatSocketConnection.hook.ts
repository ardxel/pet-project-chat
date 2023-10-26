import { chatSocket, setIsConnected } from 'entities/chats';
import { selectAccessToken, selectIsAuthorized } from 'entities/session';
import { useEffect } from 'react';
import { config } from 'shared/api';
import { useAppDispatch, useAppSelector } from 'shared/model';

export const useChatSocketConnection = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const access_token = useAppSelector(selectAccessToken);
  const dispatch = useAppDispatch();

  async function connect() {
    if (isAuthorized) {
      dispatch(setIsConnected(false));
      await chatSocket.connect(config.socketUrl, { extraHeaders: { Authorization: `Bearer ${access_token}` } });
      dispatch(setIsConnected(true));
    }
  }

  async function disconnect() {
    await chatSocket.disconnect();
    dispatch(setIsConnected(false));
  }

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, []);
};
