import { selectOpenedChatHasAllMessages, selectOpenedChatId, selectOpenedChatIsLoading } from 'entities/chats';
import { MutableRefObject, useEffect, useState } from 'react';
import { useAppSelector } from 'shared/model';

type ChatId = string;
type ScrollTopPosition = number;
/* Высота скроллбара */
type ScrollBar = number;
type ScrollPositionState = Record<ChatId, { pos: ScrollTopPosition; scrollBar: ScrollBar }>;
/**
 * Сохраняет scrollTop позицию после добавления новых сообщений
 * @param {MutableRefObject<HTMLElement>} ref - реф ссылка на объект списка сообщений.
 * @returns {void}
 */
export const useKeepScrollPositionAfterAddingNewMessages = (ref: MutableRefObject<HTMLElement>): void => {
  const isLoading = useAppSelector(selectOpenedChatIsLoading);
  const isAllMessagesFetched = useAppSelector(selectOpenedChatHasAllMessages);
  const openedChatId = useAppSelector(selectOpenedChatId);

  const [scrollPosition, setScrollPosition] = useState<ScrollPositionState>({});

  useEffect(() => {
    const { scrollTop, scrollHeight, clientHeight } = ref.current;

    if (isLoading) {
      /**
       * После начала загрузки новых сообщений сохраняем scrollTop и высоту scrollbar.
       */
      setScrollPosition((prev) => ({
        ...prev,
        [openedChatId]: { pos: scrollTop, scrollBar: scrollHeight - clientHeight },
      }));
    } else {
      if (openedChatId in scrollPosition && !isAllMessagesFetched) {
        /**
         * И уже после добавления новых сообщений устанавливаем scrollTop на сохраненный
         * в локальном стейте scrollBar и scrollTop до добавления новых сообщений.
         */
        const newScrollBar = scrollHeight - clientHeight;
        const newScrollTop = scrollPosition[openedChatId].pos + (newScrollBar - scrollPosition[openedChatId].scrollBar);
        ref.current.scrollTop = newScrollTop;
      }
    }
  }, [isLoading]);
};
