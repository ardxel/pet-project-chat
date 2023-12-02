import { fetchConversations, selectPrivateChatsExist } from 'entities/chats';
import { ChatBarCard } from 'features/chatBarCard';
import { useLayoutEffect } from 'react';
import { PuffLoader } from 'react-spinners';
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
          <div className={twMerge('flex flex-col bg-bg pb-4')}>
            {filteredChats ? (
              filteredChats.map((chat, i) => {
                return <ChatBarCard key={i} user={chat.companion} chatId={chat.conversationId} />;
              })
            ) : (
              <div className='absolute left-0 top-0 flex h-full w-full items-end justify-center pb-10 h-md:items-center h-md:pb-0'>
                <PuffLoader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
