import { FC, ReactNode } from 'react';
import { useChatSocketConnection, useChatSocketListeners } from '../api';

export const ChatSocketProvider: FC<{ children: ReactNode }> = ({ children }) => {
  useChatSocketConnection();
  useChatSocketListeners();

  return children;
};
