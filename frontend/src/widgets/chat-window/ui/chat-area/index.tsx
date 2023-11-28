import { useRef } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  useAdaptiveScrollPosition,
  useAutoFetchMessagesOnScroll,
  useKeepScrollPositionAfterAddingNewMessages as useKeepScrollBar,
} from 'widgets/chat-window/lib';
import { MessageList } from './messageList';

export const ChatArea = () => {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const onAutoFetchScroll = useAutoFetchMessagesOnScroll(chatContainerRef);
  const onAdaptiveScroll = useAdaptiveScrollPosition(chatContainerRef);

  useKeepScrollBar(chatContainerRef);

  return (
    <div className='relative h-full w-full items-center bg-aside-bg' id='message-area'>
      <div className={twMerge('h-full w-full bg-blue-100 dark:bg-aside-bg', 'absolute top-0 z-20 block max-w-full')}>
        <div className='relative flex h-full w-full items-end pb-5'>
          <div
            ref={chatContainerRef}
            onScroll={(e) => {
              onAutoFetchScroll(e);
              onAdaptiveScroll(e);
            }}
            className='scroll flex h-full w-full flex-col gap-y-2 px-4 pt-4'>
            <MessageList />
          </div>
        </div>
      </div>
    </div>
  );
};
