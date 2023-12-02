import { Dialog, Transition } from '@headlessui/react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useLazySearchUsersQuery } from 'entities/chats';
import { selectUserId } from 'entities/session';
import { ChangeEvent, FC, Fragment, useCallback, useMemo } from 'react';
import { ScaleLoader } from 'react-spinners';
import { debounce } from 'shared/lib';
import { useAppSelector } from 'shared/model';
import { SearchInput } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { UserList } from './userList';

interface CreateChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateChatModal: FC<CreateChatModalProps> = ({ onClose, isOpen }) => {
  const userId = useAppSelector(selectUserId);
  const [fetchUsers, { data: users = [], isLoading }] = useLazySearchUsersQuery();
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

  const handleOnClose = () => {
    onClose();
  };

  const filteredUsers = useMemo(() => users.filter((user) => user._id !== userId), [users]);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-[800]' onClose={handleOnClose}>
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
          <div className='flex h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel
                className={twMerge('relative h-full max-h-[420px] w-full rounded-md bg-bg transition-all xs1:w-80')}>
                <button
                  onClick={onClose}
                  className='absolute -right-3 -top-3 z-[999] h-5 w-5 rounded-full bg-bg p-5 transition-colors hover:bg-icon-active-bg  [&>*]:hover:text-icon-active-color'>
                  <ClearOutlinedIcon className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform !text-lg' />
                </button>
                <div className='flex h-full w-full flex-col gap-y-6 p-6'>
                  <h2 className='text-left'>Найти в контактах</h2>
                  <SearchInput onChange={handleSearch} placeholder='Найти контакт / чат' className='rounded-md' />
                  <div className='scroll h-full w-full'>
                    {showUsers ? <UserList users={filteredUsers} onClose={onClose} /> : null}
                    {isLoading ? (
                      <div className='flex h-full w-full items-center justify-center'>
                        <ScaleLoader className='[&>span]:!bg-blue-500' />
                      </div>
                    ) : null}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateChatModal;
