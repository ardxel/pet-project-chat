import { ChatbarCard } from 'entities/chatbarCard';
import {
  fetchConversations,
  selectConversationIdAndCompanionListSorted,
  selectPrivateChatsExist,
  selectSearchChatInput,
} from 'entities/chats';
import { useLayoutEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { PuffLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { twMerge } from 'tailwind-merge';

export const ChatList = () => {
  const chats = useAppSelector(selectConversationIdAndCompanionListSorted);
  const privateChatsExist = useAppSelector(selectPrivateChatsExist);
  const searchChatInput = useSelector(selectSearchChatInput);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!privateChatsExist) {
      dispatch(fetchConversations());
    }
  }, []);

  const filteredChatsBySearchInput = useMemo(() => {
    if (!searchChatInput.length) return chats;

    const inputLower = searchChatInput.toLowerCase();

    return chats.filter((chat) => {
      const {
        companion: { firstName, lastName, name },
      } = chat;
      const nameLower = name.toLowerCase();
      const fullnameLower = firstName && lastName ? (firstName + lastName).toLowerCase() : null;

      return nameLower.includes(inputLower) || (fullnameLower && fullnameLower.includes(inputLower));
    });
  }, [chats, searchChatInput]);

  return (
    <div className={twMerge('scroll', 'pr-0')}>
      <div className='relative w-full h-full '>
        <div className='relative w-full h-full  min-h-[80vh] pr-0'>
          <div className={twMerge('flex flex-col bg-bg pb-4')}>
            {filteredChatsBySearchInput ? (
              filteredChatsBySearchInput.map((chat, i) => {
                return <ChatbarCard key={i} user={chat.companion} conversationId={chat.conversationId} />;
              })
            ) : (
              <div className='h-full w-full absolute left-0 top-0 flex justify-center items-end pb-10 h-md:pb-0 h-md:items-center'>
                <PuffLoader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
