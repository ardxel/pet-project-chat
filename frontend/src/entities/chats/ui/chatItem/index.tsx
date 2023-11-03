import { selectIsHiddenChat, selectOpenedChatId, setIsHiddenChat, setOpenedChatId } from 'entities/chats';
import { IUser } from 'entities/session';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { AvatartByFirstLetter } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { MenuButton } from './listButton';

interface ChatListItemProps {
  user?: Partial<IUser>;
  conversationId: string;
}

export const ChatListItem: FC<ChatListItemProps> = ({ user, conversationId }) => {
  const openedChatId = useAppSelector(selectOpenedChatId);
  const isHiddenChat = useAppSelector(selectIsHiddenChat);
  const [hover, setHover] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenChat = () => {
    if (openedChatId !== conversationId) {
      dispatch(setOpenedChatId(conversationId));
    }
    if (isHiddenChat) {
      dispatch(setIsHiddenChat(false));
    }
  };

  const hasAvatar = Boolean(user.avatar);
  const hasFullname = Boolean(user.firstName && user.lastName);

  return (
    <div
      data-testid='ddd'
      className={twMerge(
        'flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 px-4 py-3 relative',
        openedChatId === conversationId ? 'bg-gray-100 dark:bg-gray-900' : '',
      )}
      onClick={handleOpenChat}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}>
      <div className='flex gap-x-3'>
        <div className='relative w-[50px] h-[50px]'>
          {hasAvatar ? (
            <img
              className={twMerge('rounded-md object-cover overflow-hidden', 'absolute w-full h-full')}
              src={user.avatar}
            />
          ) : (
            <AvatartByFirstLetter name={user.name} />
          )}
        </div>
        <div>
          {hasFullname ? (
            <>
              <h4 className='text-left text-sm'>{`${user.firstName} ${user.lastName}`}</h4>{' '}
              <p className='text-xs mt-1'>{user.name}</p>{' '}
            </>
          ) : (
            <div className='flex items-center h-full'>
              <h4 className='text-left text-sm'>{user.name}</h4>
            </div>
          )}
        </div>
      </div>
      <div>
        <MenuButton show={hover} />
      </div>
    </div>
  );
};
