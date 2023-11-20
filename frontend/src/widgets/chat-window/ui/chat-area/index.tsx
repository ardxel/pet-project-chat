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
    <div className='w-full h-full items-center relative bg-aside-bg' id='message-area'>
      <div className={twMerge('w-full h-full bg-blue-100 dark:bg-aside-bg', 'absolute top-0 z-20 block max-w-full')}>
        <div className='w-full h-full flex items-end pb-5 relative'>
          <div
            ref={chatContainerRef}
            onScroll={(e) => {
              onAutoFetchScroll(e);
              onAdaptiveScroll(e);
            }}
            className='flex flex-col w-full h-full scroll pt-4 px-4 gap-y-2'>
            <MessageList />
          </div>
        </div>
      </div>
    </div>
  );
};
