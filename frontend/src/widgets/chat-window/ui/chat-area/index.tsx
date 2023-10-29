import { selectOpenedChatMessages } from 'entities/chats';
import { useEffect, useRef } from 'react';
import { useAppSelector } from 'shared/model';
import { twMerge } from 'tailwind-merge';
import { MessageList } from './messageList';

const mockMsgs = [
  {
    _id: '653771847fc24f953ce27da5',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Hello world',
    createdAt: '2023-10-24T07:25:56.424Z',
    updatedAt: '2023-10-24T07:25:56.424Z',
  },
  {
    _id: '653772377fc24f953ce27dad',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Hello you too',
    createdAt: '2023-10-24T07:28:55.442Z',
    updatedAt: '2023-10-24T07:28:55.442Z',
  },
  {
    _id: '6537726f7fc24f953ce27db3',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0529955d0332b29dca',
    text: 'How are you today?',
    createdAt: '2023-10-24T07:29:51.857Z',
    updatedAt: '2023-10-24T07:29:51.857Z',
  },
  {
    _id: '653772857fc24f953ce27db9',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Im fine, and you?',
    createdAt: '2023-10-24T07:30:13.568Z',
    updatedAt: '2023-10-24T07:30:13.568Z',
  },
  {
    _id: '653771847fc24f953ce27da5',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Hello world',
    createdAt: '2023-10-24T07:25:56.424Z',
    updatedAt: '2023-10-24T07:25:56.424Z',
  },
  {
    _id: '653772377fc24f953ce27dad',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Hello you too',
    createdAt: '2023-10-24T07:28:55.442Z',
    updatedAt: '2023-10-24T07:28:55.442Z',
  },
  {
    _id: '6537726f7fc24f953ce27db3',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0529955d0332b29dca',
    text: 'How are you today?',
    createdAt: '2023-10-24T07:29:51.857Z',
    updatedAt: '2023-10-24T07:29:51.857Z',
  },
  {
    _id: '653772857fc24f953ce27db9',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Im fine, and you?',
    createdAt: '2023-10-24T07:30:13.568Z',
    updatedAt: '2023-10-24T07:30:13.568Z',
  },
  {
    _id: '653771847fc24f953ce27da5',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Hello world',
    createdAt: '2023-10-24T07:25:56.424Z',
    updatedAt: '2023-10-24T07:25:56.424Z',
  },
  {
    _id: '653772377fc24f953ce27dad',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Hello you too',
    createdAt: '2023-10-24T07:28:55.442Z',
    updatedAt: '2023-10-24T07:28:55.442Z',
  },
  {
    _id: '6537726f7fc24f953ce27db3',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0529955d0332b29dca',
    text: 'How are you today?',
    createdAt: '2023-10-24T07:29:51.857Z',
    updatedAt: '2023-10-24T07:29:51.857Z',
  },
  {
    _id: '653772857fc24f953ce27db9',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Im fine, and you?',
    createdAt: '2023-10-24T07:30:13.568Z',
    updatedAt: '2023-10-24T07:30:13.568Z',
  },
  {
    _id: '653771847fc24f953ce27da5',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Hello world',
    createdAt: '2023-10-24T07:25:56.424Z',
    updatedAt: '2023-10-24T07:25:56.424Z',
  },
  {
    _id: '653772377fc24f953ce27dad',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Hello you too',
    createdAt: '2023-10-24T07:28:55.442Z',
    updatedAt: '2023-10-24T07:28:55.442Z',
  },
  {
    _id: '6537726f7fc24f953ce27db3',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0529955d0332b29dca',
    text: 'How are you today?',
    createdAt: '2023-10-24T07:29:51.857Z',
    updatedAt: '2023-10-24T07:29:51.857Z',
  },
  {
    _id: '653772857fc24f953ce27db9',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Im fine, and you?',
    createdAt: '2023-10-24T07:30:13.568Z',
    updatedAt: '2023-10-24T07:30:13.568Z',
  },
  {
    _id: '653771847fc24f953ce27da5',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Hello world',
    createdAt: '2023-10-24T07:25:56.424Z',
    updatedAt: '2023-10-24T07:25:56.424Z',
  },
  {
    _id: '653772377fc24f953ce27dad',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Hello you too',
    createdAt: '2023-10-24T07:28:55.442Z',
    updatedAt: '2023-10-24T07:28:55.442Z',
  },
  {
    _id: '6537726f7fc24f953ce27db3',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0529955d0332b29dca',
    text: 'Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?',
    createdAt: '2023-10-24T07:29:51.857Z',
    updatedAt: '2023-10-24T07:29:51.857Z',
  },
  {
    _id: '6537726f7fc24f953ce27db3',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0529955d0332b29dca',
    text: 'Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?',
    createdAt: '2023-10-24T07:29:51.857Z',
    updatedAt: '2023-10-24T07:29:51.857Z',
  },
  {
    _id: '653772857fc24f953ce27db9',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?Im fine, and you?',
    createdAt: '2023-10-24T07:30:13.568Z',
    updatedAt: '2023-10-24T07:30:13.568Z',
  },
  {
    _id: '653771847fc24f953ce27da5',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Hello world',
    createdAt: '2023-10-24T07:25:56.424Z',
    updatedAt: '2023-10-24T07:25:56.424Z',
  },
  {
    _id: '653772377fc24f953ce27dad',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Hello you too',
    createdAt: '2023-10-24T07:28:55.442Z',
    updatedAt: '2023-10-24T07:28:55.442Z',
  },
  {
    _id: '6537726f7fc24f953ce27db3',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0529955d0332b29dca',
    text: 'How are you today?',
    createdAt: '2023-10-24T07:29:51.857Z',
    updatedAt: '2023-10-24T07:29:51.857Z',
  },
  {
    _id: '653772857fc24f953ce27db9',
    conversationId: '65376f7b29955d0332b29dd1',
    sender: '65376f0329955d0332b29dc7',
    text: 'Im fine, and you?',
    createdAt: '2023-10-24T07:30:13.568Z',
    updatedAt: '2023-10-24T07:30:13.568Z',
  },
];

export const ChatArea = () => {
  const messages = useAppSelector(selectOpenedChatMessages);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  console.log(messages);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className='w-full h-full items-center relative bg-aside-bg'>
      <div
        ref={chatContainerRef}
        className={twMerge(
          'w-full h-full bg-blue-100 dark:bg-aside-bg',
          'absolute z-20 block max-h-full max-w-full scroll',
        )}>
        <div className='w-full h-full flex items-end pb-5'>
          <div className='flex flex-col w-full justify-end px-4 gap-y-2'>
            {messages && <MessageList messages={messages} />}
          </div>
        </div>
      </div>
    </div>
  );
};
