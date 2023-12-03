import { selectOpenedChatId } from 'entities/chats';
import { selectIsAuthorized, selectSocketStatus } from 'entities/session';
import { selectOpenChat, setOpenChat } from 'entities/ui-visibility';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';

export const useChatGuard = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const connectionStatus = useAppSelector(selectSocketStatus);
  const openedChatId = useAppSelector(selectOpenedChatId);
  const isOpen = useAppSelector(selectOpenChat);
  const isConnected = connectionStatus === 'connected';

  const dispatch = useAppDispatch();

  /**
   * Если уже есть открытый чат id в privateChats, а в uiVisibility не открыт чат,
   * то тогда открыть чат.
   */
  useEffect(() => {
    if (typeof openedChatId === 'string' && !isOpen) {
      dispatch(setOpenChat());
    }
  }, [openedChatId, isOpen]);

  const access = isAuthorized && isConnected;

  return access;
};
