import { chatSocket } from 'entities/chats';
import { changeSocketStatus, selectAccessToken, selectIsAuthorized } from 'entities/session';
import { useCallback, useEffect } from 'react';
import { config } from 'shared/api';
import { useAppDispatch, useAppSelector } from 'shared/model';

enum SocketStatus {
  STOP = 'stop',
  LOADING = 'loading',
  CONNECTED = 'connected',
}

export const useChatSocketConnection = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const access_token = useAppSelector(selectAccessToken);
  const dispatch = useAppDispatch();

  const setConnectionStatus = (status: `${SocketStatus}`) => {
    dispatch(changeSocketStatus(status));
  };

  const disconnect = useCallback(() => {
    chatSocket.disconnect().then(() => setConnectionStatus(SocketStatus.STOP));
  }, []);

  const connect = useCallback(() => {
    if (!isAuthorized) return;
    const options = {
      extraHeaders: {
        Authorization: `Bearer ${access_token}`,
      },
    };
    setConnectionStatus(SocketStatus.LOADING);
    chatSocket
      .connect(config.socketUrl, options)
      .then(() => setConnectionStatus(SocketStatus.CONNECTED))
      .catch((reason) => {
        console.error(reason);
        disconnect();
      });
  }, [access_token, isAuthorized]);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [isAuthorized]);
};
