import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { fetchMessages } from '../api';
import { incrementPageCount, selectOpenedChatId, selectPrivateChatLastPage } from '../model';

export const useFetchFirstPageMessages = () => {
  const openedChatId = useAppSelector(selectOpenedChatId);
  const page = useAppSelector(selectPrivateChatLastPage(openedChatId));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (openedChatId && page === 1) {
      dispatch(fetchMessages({ conversationId: openedChatId, page }));
      dispatch(incrementPageCount(openedChatId));
    }
  }, [openedChatId, page]);
};
