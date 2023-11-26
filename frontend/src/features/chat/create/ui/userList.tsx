import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { selectPrivateChatList, setOpenedChatId } from 'entities/chats';
import { IUser, userUtils } from 'entities/session';
import { FC, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { IconWrapper, UserAvatar } from 'shared/ui';
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
      } else {
        dispatch(createPrivateChat(userId));
      }
      onClose();
    },
    [users],
  );

  return users.map((user) => {
    const hasFullname = userUtils.hasFullname(user);
    return (
      <div key={user._id} className='flex items-center justify-between cursor-pointer px-4 py-3 relative'>
        <div className='flex gap-x-3'>
          <div className='relative w-[50px] h-[50px]'>
            <UserAvatar user={user} className='w-full h-full' />
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
