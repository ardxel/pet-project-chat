import {
  ChatListItem,
  fetchConversations,
  selectConversationIdAndCompanionList,
  selectSearchInput,
} from 'entities/chats';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { PuffLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { twMerge } from 'tailwind-merge';

export const ChatList = () => {
  const chats = useAppSelector(selectConversationIdAndCompanionList);
  const searchInput = useSelector(selectSearchInput);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchConversations());
  }, []);

  const filteredChatsBySearchInput = useMemo(() => {
    if (!searchInput.length) return chats;

    const inputLower = searchInput.toLowerCase();

    return chats.filter((chat) => {
      const {
        companion: { firstName, lastName, name },
      } = chat;
      const nameLower = name.toLowerCase();
      const fullnameLower = firstName && lastName ? (firstName + lastName).toLowerCase() : null;

      return nameLower.includes(inputLower) || (fullnameLower && fullnameLower.includes(inputLower));
    });
  }, [chats, searchInput]);

  return (
    <div className={twMerge('scroll')}>
      <div className='relative w-full h-full '>
        <div className='relative w-full h-full  min-h-[80vh]'>
          <div className={twMerge('flex flex-col bg-bg pb-4')}>
            {filteredChatsBySearchInput ? (
              filteredChatsBySearchInput.map((chat, i) => {
                return <ChatListItem key={i} user={chat.companion} conversationId={chat.conversationId} />;
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
