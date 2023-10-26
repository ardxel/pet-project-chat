import { ChatListItem, fetchConversations, selectChatCompanions } from 'entities/chats';
import { IUser } from 'entities/session';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';

export const ChatList = () => {
  const companions = useAppSelector(selectChatCompanions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchConversations());
  }, []);

  return (
    <div className='flex flex-col'>
      {companions &&
        companions.map((user, i) => {
          return <ChatListItem key={i} user={user as IUser} />;
        })}
    </div>
  );
};
