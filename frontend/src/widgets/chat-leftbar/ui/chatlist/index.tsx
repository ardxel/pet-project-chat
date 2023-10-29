import { ChatListItem, fetchConversations, selectConversationIdAndCompanionList } from 'entities/chats';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';

export const ChatList = () => {
  const chats = useAppSelector(selectConversationIdAndCompanionList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchConversations());
  }, []);

  return (
    <div className='flex flex-col'>
      {chats &&
        chats.map((chat, i) => {
          return <ChatListItem key={i} user={chat.companion} conversationId={chat.conversationId} />;
        })}
    </div>
  );
};
