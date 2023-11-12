import { selectOpenedChatId, selectOpenedChatMessagesLength } from 'entities/chats';
import { MutableRefObject, UIEvent, useCallback, useEffect, useState } from 'react';
import { debounce } from 'shared/lib';
import { useAppSelector } from 'shared/model';

type ChatId = string;
type ScrollPosition = number;
type ScrollPositionState = Record<ChatId, ScrollPosition>;
/**
 *
 * @param {MutableRefObject<HTMLElement>} ref ссылка на на объект поля сообщений
 * @returns возвращает onScroll коллбэк, который служит для сохранения scrollTop свойства в локальном стейте.
 * При смене чата, происходит перерисовка компонента отвечающего за отображение сообщений, Этот хук сохраняет последний
 * scrollTop каждого чата и применяет его при каждой смене чата.
 */
export const useAdaptiveScrollPosition = (ref: MutableRefObject<HTMLElement>) => {
  const [scrollPositions, setScrollPositions] = useState<ScrollPositionState>({});

  const openedChatId = useAppSelector(selectOpenedChatId);
  const msgLength = useAppSelector(selectOpenedChatMessagesLength);

  const MESSAGE_FETCH_SIZE_LIMIT = 30;
  const isFirstRender = msgLength <= MESSAGE_FETCH_SIZE_LIMIT;

  /**
   * Изменяет scrollTop на сохраненный после смены чата
   */
  useEffect(() => {
    if (openedChatId in scrollPositions && !isFirstRender) {
      ref.current.scrollTop = scrollPositions[openedChatId];
    }
  }, [openedChatId]);

  /**
   * Просто фиксирует положение scrollBar`a в самом низу при первом рендере,
   * @dontTouch работает только с данными зависимостями.
   */
  useEffect(() => {
    if (isFirstRender) {
      const target = ref.current;
      target.scrollTop = target.scrollHeight;
    }
  }, [openedChatId, msgLength]);

  const onScroll = useCallback(
    debounce((event: UIEvent<HTMLElement>) => {
      const target = event.target as HTMLElement;
      if (target) {
        const pos = target.scrollTop;
        if (pos > 0) {
          setScrollPositions((prev) => ({ ...prev, [openedChatId]: pos }));
        }
      }
    }, 40),
    [],
  );
  return onScroll;
};
