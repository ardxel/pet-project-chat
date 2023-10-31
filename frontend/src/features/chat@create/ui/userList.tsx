import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { selectPrivateChatList, setOpenedChatId } from 'entities/chats';
import { IUser } from 'entities/session';
import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { AvatartByFirstLetter, IconWrapper } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { createPrivateChat } from '../model';

interface UserListProps {
  users: IUser[];
  onClose: () => void;
}

export const UserList: FC<UserListProps> = ({ users, onClose }) => {
  const privateChats = useAppSelector(selectPrivateChatList);
  const dispatch = useAppDispatch();

  const findPrivateChatIdByCompanionId = useCallback(
    (companionId: string) => {
      for (const chatId in privateChats) {
        if (privateChats[chatId].companion._id === companionId) {
          return chatId;
        }
      }
    },
    [privateChats],
  );

  const onCreateChat = useCallback(
    (userId: string) => {
      const existedChatId = findPrivateChatIdByCompanionId(userId);
      if (existedChatId) {
        dispatch(setOpenedChatId(existedChatId));
        onClose();
      } else {
        dispatch(createPrivateChat(userId));
        onClose();
      }
    },
    [users],
  );

  return users.map((user) => {
    const hasAvatar = !!user.avatar;
    const hasFullname = !!user.firstName && !!user.lastName;
    return (
      <div key={user._id} className='flex items-center justify-between cursor-pointer px-4 py-3 relative'>
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
                <h4 className='text-left text-sm'>{`${user.firstName} ${user.lastName}`}</h4>
                <p className='text-xs mt-1'>{user.name}</p>
              </>
            ) : (
              <div className='flex items-center h-full'>
                <h4 className='text-left text-sm'>{user.name}</h4>
              </div>
            )}
          </div>
        </div>
        <button className='absolute z-50 right-5' onClick={() => onCreateChat(user._id)}>
          <IconWrapper className='w-10 h-10'>
            <TextsmsOutlinedIcon className='!w-5 !h-5' />
          </IconWrapper>
        </button>
      </div>
    );
  });
};
