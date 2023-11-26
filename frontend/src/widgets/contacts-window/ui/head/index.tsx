import ClearIcon from '@mui/icons-material/Clear';
import { openContactPageById, selectOpenedPageContactData } from 'entities/contacts';
import { selectUserData, userUtils } from 'entities/session';
import { setOpenContactPage } from 'entities/ui-visibility';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { UserAvatar } from 'shared/ui';

export const ContactsWindowHeader = () => {
  const contact = useAppSelector(selectOpenedPageContactData);
  const me = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();

  const closePage = () => {
    dispatch(openContactPageById(false));
    dispatch(setOpenContactPage(false));
  };

  const mutualContactsLength = useMemo<number>(() => {
    return userUtils.getMutualContactIds(contact.user, me).length;
  }, [contact, me]);

  return (
    <div className='w-full'>
      <div className='w-full p-7 relative rounded-2xl bg-bg'>
        <button
          onClick={closePage}
          className='md:hidden absolute right-1/2 let-1/2 z-[999] bg-icon-bg -top-3 p-4 xs1:p-5 w-4 h-4 xs1:w-5 xs1:h-5 rounded-full transition-colors hover:bg-icon-active-bg  [&>*]:hover:text-icon-active-color'>
          <ClearIcon className='!text-lg absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-full h-full' />
        </button>{' '}
        <div className='flex items-end gap-x-4'>
          <div className='w-24 h-24 xs2:w-32 xs2:h-32 flex'>
            <UserAvatar user={contact.user} className='w-full h-full [&>h1]:text-[3rem] border-[0.2rem] rounded-lg' />
          </div>
          <div className='flex flex-col'>
            <div className='flex gap-x-2 items-baseline'>
              <h1 className='text-xl text-gray-500 dark:text-gray-300'>{userUtils.getName(contact.user)}</h1>
              <p className='text-[0.9rem] text-form-color font-600'>{'@' + contact.user.name}</p>
            </div>
            <div className='inline-block leading-4 h-4'>
              <p className='text-[0.8rem] text-form-color'>
                {`${userUtils.getUserContactsLength(contact.user)} Контактов`}
                <span className='align-middle text-xl mx-[0.2rem] text-gray-400 dark:text-gray-500'>•</span>
                <span className='text-[0.7rem] align-middle  text-gray-400 dark:text-gray-500'>{`${mutualContactsLength} Общих`}</span>
              </p>
            </div>
            <div className='h-5'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
