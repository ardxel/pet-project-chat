import {
  fetchMessages,
  selectOpenedChatHasAllMessages,
  selectOpenedChatId,
  selectOpenedChatIsLoading,
  selectOpenedPrivateChatLastPage,
} from 'entities/chats';
import { MutableRefObject, UIEvent, useLayoutEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';

/**
 *
 * @param {MutableRefObject<HTMLElement>} ref - ссылка на компонент отвечающий за отображение списка сообщений
 * @returns {Function} возвращает коллбэк для onScroll ивента. Служит для автоматической загрузки новых сообщений
 * при достижении скроллбара до определенной координаты.
 */
export const useAutoFetchMessagesOnScroll = (ref: MutableRefObject<HTMLElement>) => {
  const openedChatId = useAppSelector(selectOpenedChatId);
  const isAllMessagesFetched = useAppSelector(selectOpenedChatHasAllMessages);
  const page = useAppSelector(selectOpenedPrivateChatLastPage);
  const isLoading = useAppSelector(selectOpenedChatIsLoading);
  const timeout = useRef<NodeJS.Timeout>(null);

  const FETCH_MESSAGES_DELAY = 250;
  const SCROLLTOP_TRIGGER_POINT = ref.current ? ref.current.scrollHeight * 0.3 : 250;
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    /**
     * Запросить первые сообщения если чат открыт и страница сообщений равна единице
     */
    if (openedChatId && page === 1) {
      dispatch(fetchMessages({ conversationId: openedChatId, page }));
    }
  }, [openedChatId, page]);

  const onScrollAutoFetchMessages = (event: UIEvent<HTMLElement>) => {
    clearTimeout(timeout.current);
    const container = event.currentTarget as HTMLElement;
    /**
     * Если не все сообщения уже скачены,
     * Если не идет процесс загрузки новых сообщений,
     * Если ScrollTop значение меньше чем триггер значение @see {SCROLLTOP_TRIGGER_POINT}
     * Если не первая страница сообщений, так как загрузкой первой страницы сообщений занимается useLayoutEffect
     */
    const active = !isAllMessagesFetched && !isLoading && container.scrollTop <= SCROLLTOP_TRIGGER_POINT && page !== 1;

    if (active) {
      /**
       * задержка для того, чтобы не было преждевременного срабатывания
       * после первого рендеринга
       */
      timeout.current = setTimeout(() => {
        dispatch(fetchMessages({ conversationId: openedChatId, page }));
      }, FETCH_MESSAGES_DELAY);
    }
  };
  return onScrollAutoFetchMessages;
};
