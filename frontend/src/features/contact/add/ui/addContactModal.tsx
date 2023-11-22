import { Dialog, Transition } from '@headlessui/react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import DownloadDoneOutlinedIcon from '@mui/icons-material/DownloadDoneOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { useLazySearchUsersByNameQuery } from 'entities/chats';
import { AddContactDto, selectContactList } from 'entities/contacts';
import { selectUserId } from 'entities/session';
import { ChangeEvent, FC, Fragment, useCallback, useMemo } from 'react';
import { ScaleLoader } from 'react-spinners';
import { debounce } from 'shared/lib';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { IconWrapper, SearchInput, UserAvatar } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { addContactThunk } from '../model';

interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddContactModal: FC<AddContactModalProps> = ({ onClose, isOpen }) => {
  const [fetchUsers, { data: users = [], isLoading }] = useLazySearchUsersByNameQuery();
  const contacts = useAppSelector(selectContactList);
  const userId = useAppSelector(selectUserId);
  const dispatch = useAppDispatch();

  const handleSearch = useCallback(
    debounce(async (event: ChangeEvent<HTMLInputElement>) => {
      const input = event.target.value;
      if (!input || input.length < 2) return;

      await fetchUsers({ name: input, limit: 10 });
    }, 400),
    [],
  );

  const contactIsExist = useCallback(
    (id: string) => {
      return contacts.some((contact) => contact.user._id === id);
    },
    [contacts],
  );

  const handleAddContact = (id: string) => {
    const body: AddContactDto = { initiatorId: userId, addedId: id };
    if (contactIsExist(id)) return;

    dispatch(addContactThunk(body));
  };

  const filteredUsers = useMemo(() => users.filter((u) => u._id !== userId), [users]);

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
              <Dialog.Panel className={twMerge('w-full xs1:w-80 bg-bg rounded-md transition-all')}>
                <button
                  onClick={onClose}
                  className='absolute -right-3 -top-3 bg-bg p-5 w-5 h-5 rounded-full transition-colors hover:bg-icon-active-bg  [&>*]:hover:text-icon-active-color'>
                  <ClearOutlinedIcon className='!text-lg absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-full h-full' />
                </button>
                <div className='flex flex-col w-full h-full p-6 gap-y-6'>
                  <h2 className='text-left'>Найти по имени</h2>
                  <SearchInput onChange={handleSearch} placeholder='Найти контакт / чат' className='rounded-md' />
                  <div className='h-full w-full scroll'>
                    {isLoading ? (
                      <div className='w-full h-full flex justify-center items-center'>
                        <ScaleLoader className='[&>span]:!bg-blue-500' />
                      </div>
                    ) : (
                      filteredUsers.map((user) => {
                        const isExist = contactIsExist(user._id);
                        const hasFullname = !!user.firstName && !!user.lastName;
                        return (
                          <div
                            key={user._id}
                            className='flex items-center justify-between cursor-pointer px-4 py-3 relative'>
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
                            <button
                              className='absolute z-50 right-5'
                              disabled={isExist}
                              onClick={isExist ? undefined : () => handleAddContact(user._id)}>
                              <IconWrapper className='w-10 h-10'>
                                {isExist ? (
                                  <DownloadDoneOutlinedIcon className='!w-5 !h-5' />
                                ) : (
                                  <PersonAddAlt1OutlinedIcon className='!w-5 !h-5' />
                                )}
                              </IconWrapper>
                            </button>
                          </div>
                        );
                      })
                    )}
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
