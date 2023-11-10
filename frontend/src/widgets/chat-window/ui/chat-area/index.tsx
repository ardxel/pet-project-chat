import { selectOpenedChatMessages } from 'entities/chats';
import { useRef } from 'react';
import { useAppSelector } from 'shared/model';
import { twMerge } from 'tailwind-merge';
import { useAutoFetchMessagesOnScroll } from 'widgets/chat-window/lib';
import { MessageList } from './messageList';

export const ChatArea = () => {
  const messages = useAppSelector(selectOpenedChatMessages);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { onScroll } = useAutoFetchMessagesOnScroll(chatContainerRef);

  return (
    <div className='w-full h-full items-center relative bg-aside-bg'>
      <div className={twMerge('w-full h-full bg-blue-100 dark:bg-aside-bg', 'absolute top-0 z-20 block max-w-full')}>
        <div className='w-full h-full flex items-end pb-5'>
          <div
            ref={chatContainerRef}
            onScroll={onScroll}
            className='flex flex-col w-full h-full scroll pt-4 px-4 gap-y-2'>
            {messages && <MessageList messages={messages} />}
          </div>
        </div>
      </div>
    </div>
  );
};
