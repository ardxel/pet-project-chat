import {
  fetchMessages,
  incrementPageCount,
  selectOpenedChatHasAllMessages,
  selectOpenedChatId,
  selectOpenedChatMessages,
  selectPrivateChatLastPage,
  selectPrivateChatLastScrollPoint,
  setLastScrollPoint,
} from 'entities/chats';
import { UIEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { twMerge } from 'tailwind-merge';
import { MessageList } from './messageList';

export const ChatArea = () => {
  const messages = useAppSelector(selectOpenedChatMessages);
  const openedChatId = useAppSelector(selectOpenedChatId);
  const isFull = useAppSelector(selectOpenedChatHasAllMessages);
  const page = useAppSelector(selectPrivateChatLastPage(openedChatId));
  const lastScrollPoint = useAppSelector(selectPrivateChatLastScrollPoint(openedChatId));

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState(undefined);
  const timeout = useRef<ReturnType<typeof setTimeout>>(null);

  const FETCH_MESSAGES_DELAY = 500;
  const SCROLLTOP_TRIGGER_POINT = 50;
  const dispatch = useAppDispatch();

  useEffect(() => {
    const container = chatContainerRef.current;
    if (lastScrollPoint === 0) {
      if (prevScrollHeight) {
        /*
         * изменяем scrollTop на значение разницы текущего scrollHeight и прошлого,
         * чтобы значение scrollTop не сохранялось с числом 0 после добавления новых сообщений
         */
        container.scrollTop = container.scrollHeight - prevScrollHeight;
      } else {
        /* При первом рендере нужно опустить скроллбар до конца. */
        container.scrollTop = container.scrollHeight;
      }
    } else {
      chatContainerRef.current.scrollTop = lastScrollPoint;
    }
    return () => {
      /**
       * Сохраняем в map объекте каждого чата последние координаты,
       * так как при смене чата скроллбар остается на преждем месте
       */
      dispatch(
        setLastScrollPoint({
          chatId: openedChatId,
          point: chatContainerRef.current ? chatContainerRef.current.scrollTop : 0,
        }),
      );
    };
  }, [openedChatId, messages]);

  const onScrollAutoFetchMessages = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      clearTimeout(timeout.current);
      const container = event.currentTarget;
      /**
       * задержка для того, чтобы не было преждевременного срабатывания
       * после первого рендеринга
       */
      if (container.scrollTop <= SCROLLTOP_TRIGGER_POINT && !isFull) {
        timeout.current = setTimeout(() => {
          dispatch(fetchMessages({ conversationId: openedChatId, page }));
          dispatch(incrementPageCount(openedChatId));
          setPrevScrollHeight(container.scrollHeight);
        }, FETCH_MESSAGES_DELAY);
      }
    },
    [openedChatId, page],
  );

  return (
    <div className='w-full h-full items-center relative bg-aside-bg'>
      <div className={twMerge('w-full h-full bg-blue-100 dark:bg-aside-bg', 'absolute top-0 z-20 block max-w-full')}>
        <div className='w-full h-full flex items-end pb-5'>
          <div
            ref={chatContainerRef}
            onScroll={onScrollAutoFetchMessages}
            className='flex flex-col w-full h-full scroll pt-4 px-4 gap-y-2'>
            {messages && <MessageList messages={messages} />}
          </div>
        </div>
      </div>
    </div>
  );
};
