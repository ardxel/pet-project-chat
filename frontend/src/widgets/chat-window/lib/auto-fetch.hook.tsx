import {
  fetchMessages,
  selectOpenedChatHasAllMessages,
  selectOpenedChatId,
  selectOpenedChatMessages,
  selectPrivateChatLastPage,
  selectPrivateChatLastScrollPoint,
  setLastScrollPoint,
} from 'entities/chats';
import { MutableRefObject, UIEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';

export const useAutoFetchMessagesOnScroll = (ref: MutableRefObject<HTMLElement>) => {
  const openedChatId = useAppSelector(selectOpenedChatId);
  const messages = useAppSelector(selectOpenedChatMessages);
  const isAllMessagesFetched = useAppSelector(selectOpenedChatHasAllMessages);
  const page = useAppSelector(selectPrivateChatLastPage(openedChatId));
  const lastScrollPoint = useAppSelector(selectPrivateChatLastScrollPoint(openedChatId));

  const [isLoading, setIsLoading] = useState(false);
  const timeout = useRef<NodeJS.Timeout>(null);

  const FETCH_MESSAGES_DELAY = 250;
  const SCROLLTOP_TRIGGER_POINT = ref.current ? ref.current.scrollHeight * 0.3 : 250;
  const dispatch = useAppDispatch();

  useEffect(() => {
    /**
     * Запросить первые сообщения если чат открыт и страница сообщений равна единице
     */
    if (openedChatId && page === 1) {
      dispatch(fetchMessages({ conversationId: openedChatId, page }));
    }
  }, [openedChatId]);

  useEffect(() => {
    const container = ref.current;
    if (!lastScrollPoint) {
      container.scrollTop = container.scrollHeight;
    } else {
      container.scrollTop = Math.abs(container.scrollHeight - lastScrollPoint);
    }
    return () => {
      /**
       * Сохраняем в map объекте каждого чата последние координаты,
       * так как при смене чата скроллбар остается на преждем месте
       */
      if (container) {
        dispatch(
          setLastScrollPoint({
            chatId: openedChatId,
            point: container.scrollHeight - container.scrollTop,
          }),
        );
      }
    };
  }, [openedChatId, messages]);

  const onScrollAutoFetchMessages = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      clearTimeout(timeout.current);
      const container = event.currentTarget;
      /**
       * Если не все сообщения имеются на клиенте,
       * Если не идет процесс загрузки,
       * Если ScrollTop значение меньше чем триггер значение @see {SCROLLTOP_TRIGGER_POINT}
       */
      const active = !isAllMessagesFetched && !isLoading && container.scrollTop <= SCROLLTOP_TRIGGER_POINT;
      /**
       * задержка для того, чтобы не было преждевременного срабатывания
       * после первого рендеринга
       */
      if (active) {
        timeout.current = setTimeout(() => {
          setIsLoading(true);
          dispatch(fetchMessages({ conversationId: openedChatId, page }));
          setIsLoading(false);
        }, FETCH_MESSAGES_DELAY);
      }
    },
    [openedChatId, page],
  );

  return { onScroll: onScrollAutoFetchMessages };
};
