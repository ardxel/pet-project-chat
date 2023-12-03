import ClearIcon from '@mui/icons-material/Clear';
import { formatContactWord, openContactPageById, selectOpenedPageContactData } from 'entities/contacts';
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

  const contactsLength = contact.user.contacts?.length || 0;
  const mutualContactsLength = useMemo<number>(() => {
    return userUtils.getMutualContactIds(contact.user, me).length;
  }, [contact, me]);

  return (
    <div className='w-full'>
      <div className='relative w-full rounded-2xl bg-bg p-7'>
        <button
          onClick={closePage}
          className='let-1/2 absolute -top-3 right-1/2 z-[999] h-4 w-4 rounded-full bg-icon-bg p-4 transition-colors hover:bg-icon-active-bg xs1:h-5 xs1:w-5 xs1:p-5 md:hidden  [&>*]:hover:text-icon-active-color'>
          <ClearIcon className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform !text-lg' />
        </button>{' '}
        <div className='flex items-end gap-x-4'>
          <div className='flex h-24 w-24 xs2:h-32 xs2:w-32'>
            <UserAvatar user={contact.user} className='h-full w-full rounded-lg border-[0.2rem] [&>h1]:text-[3rem]' />
          </div>
          <div className='flex flex-col'>
            <div className='flex items-baseline gap-x-2'>
              <h1 className='text-xl text-gray-500 dark:text-gray-300'>{userUtils.getName(contact.user)}</h1>
              {contact.user?.name && (
                <p className='font-600 text-[0.9rem] text-form-color'>{'@' + contact.user?.name}</p>
              )}
            </div>
            <div className='inline-block h-4 leading-4'>
              <p className='text-[0.8rem] text-form-color'>
                {`${contactsLength} ${formatContactWord(contactsLength)}`}
                <span className='mx-[0.2rem] align-middle text-xl text-gray-400 dark:text-gray-500'>•</span>
                <span className='align-middle text-[0.7rem]  text-gray-400 dark:text-gray-500'>{`${mutualContactsLength} Общих`}</span>
              </p>
            </div>
            <div className='h-5'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
