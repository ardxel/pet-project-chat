import {
  ChatListItem,
  fetchConversations,
  selectConversationIdAndCompanionList,
  selectSearchInput,
} from 'entities/chats';
import { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from 'shared/model';

export const ChatList = () => {
  const chats = useAppSelector(selectConversationIdAndCompanionList);
  const searchInput = useSelector(selectSearchInput);

  const dispatch = useAppDispatch();

  //TODO
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
    <div className='flex flex-col '>
      {chats &&
        filteredChatsBySearchInput.map((chat, i) => {
          return <ChatListItem key={i} user={chat.companion} conversationId={chat.conversationId} />;
        })}
    </div>
  );
};
