import { selectOpenedChatMessages } from 'entities/chats';
import { useRef, useState } from 'react';
import { useAppSelector } from 'shared/model';
import { twMerge } from 'tailwind-merge';
import {
  useAdaptiveScrollPosition,
  useAutoFetchMessagesOnScroll,
  useKeepScrollPositionAfterAddingNewMessages as useKeepScrollBar,
} from 'widgets/chat-window/lib';
import { MessageList } from './messageList';
import { SearchMessageBar } from './searchMessage';

export const ChatArea = () => {
  const messages = useAppSelector(selectOpenedChatMessages, { stabilityCheck: 'always' });
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const onAutoFetchScroll = useAutoFetchMessagesOnScroll(chatContainerRef);
  const onAdaptiveScroll = useAdaptiveScrollPosition(chatContainerRef);

  useKeepScrollBar(chatContainerRef);
  const selectIndex = (idx: number) => setSelectedMessageIndex(idx);

  return (
    <div className='w-full h-full items-center relative bg-aside-bg' id='message-area'>
      <div className={twMerge('w-full h-full bg-blue-100 dark:bg-aside-bg', 'absolute top-0 z-20 block max-w-full')}>
        <div className='w-full h-full flex items-end pb-5 relative'>
          <SearchMessageBar onSelectedIndex={selectIndex} />
          <div
            ref={chatContainerRef}
            onScroll={(e) => {
              onAutoFetchScroll(e);
              onAdaptiveScroll(e);
            }}
            className='flex flex-col w-full h-full scroll pt-4 px-4 gap-y-2'>
            {messages && <MessageList selectedIndex={selectedMessageIndex} messages={messages} />}
          </div>
        </div>
      </div>
    </div>
  );
};
