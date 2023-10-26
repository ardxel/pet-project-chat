import { FC, ReactNode } from 'react';
import { useChatSocketListeners } from '../api';
import { useChatSocketConnection } from './useChatSocketConnection.hook';

export const ChatSocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  useChatSocketConnection();
  useChatSocketListeners();

  return children;
};
