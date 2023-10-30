import { Dialog, Transition } from '@headlessui/react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import { useLazySearchUsersByNameQuery } from 'entities/chats';
import { IUser, selectUserId } from 'entities/session';
import { ChangeEvent, FC, Fragment, useCallback, useMemo } from 'react';
import { debounce } from 'shared/lib';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { AvatartByFirstLetter, IconWrapper, SearchInput } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { createPrivateChat } from '../model';

interface UserListProps {
  users: IUser[];
  onClose: () => void;
}

const UserList: FC<UserListProps> = ({ users, onClose }) => {
  const dispatch = useAppDispatch();

  const onCreateChat = (userId: string) => {
    dispatch(createPrivateChat(userId));
    onClose();
  };

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

interface CreateChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateChatModal: FC<CreateChatModalProps> = ({ onClose, isOpen }) => {
  const userId = useAppSelector(selectUserId);
  const [fetchUsers, { data: users = [], isLoading }] = useLazySearchUsersByNameQuery();
  const showUsers = !isLoading && users.length > 0;

  const handleSearch = useCallback(
    debounce(async (event: ChangeEvent<HTMLInputElement>) => {
      const inputName = event.target.value;
      if (inputName.length < 2) return;
      const limit = 10;
      const page = 1;
      await fetchUsers({ name: inputName, limit, page });
    }, 500),
    [],
  );

  const filteredUsers = useMemo(() => users.filter((user) => user._id !== userId), [users]);
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-[800]' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>
        <div className='fixed inset-0'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className={twMerge('w-full xs1:w-80 bg-bg rounded-md transition-all max-h-[100vh]')}>
                <button
                  onClick={onClose}
                  className='absolute -right-3 -top-3 bg-bg p-5 w-5 h-5 rounded-full transition-colors hover:bg-icon-active-bg  [&>*]:hover:text-icon-active-color'>
                  <ClearOutlinedIcon className='!text-lg absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-full h-full' />
                </button>
                <div className='flex flex-col w-full h-full p-6 gap-y-6'>
                  <h2 className='text-left'>Найти в контактах</h2>
                  <SearchInput onChange={handleSearch} placeholder='Найти контакт / чат' className='rounded-md' />
                </div>
                <div className=''>{showUsers && <UserList users={filteredUsers} onClose={onClose} />}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
