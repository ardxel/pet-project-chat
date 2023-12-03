import { fetchConversations, selectPrivateChatsExist } from 'entities/chats';
import { ChatBarCard } from 'features/chatBarCard';
import { useLayoutEffect } from 'react';
import { ScaleLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { twMerge } from 'tailwind-merge';
import { useFilterChats } from 'widgets/chat-leftbar/lib';

export const ChatList = () => {
  const privateChatsExist = useAppSelector(selectPrivateChatsExist);
  const dispatch = useAppDispatch();

  const filteredChats = useFilterChats();

  useLayoutEffect(() => {
    if (!privateChatsExist) {
      dispatch(fetchConversations());
    }
  }, [privateChatsExist]);

  return (
    <div className={twMerge('scroll', 'pr-0')}>
      <div className='relative h-full w-full '>
        <div className='relative h-full min-h-[80vh]  w-full pr-0'>
          {!filteredChats && (
            <div className='flex h-full w-full items-center justify-center'>
              <ScaleLoader className='w-30 h-30 [&>span]:!bg-blue-500' />
            </div>
          )}
          <div className={twMerge('flex flex-col bg-bg pb-4')}>
            {filteredChats &&
              filteredChats.map((chat, i) => {
                return <ChatBarCard key={i} user={chat.companion} chatId={chat.conversationId} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
};
