import { openContactPageById, selectOpenedContactPageUserId } from 'entities/contacts';
import { Contact, userUtils } from 'entities/session';
import { selectOpenContactPage, setOpenContactPage } from 'entities/ui-visibility';
import { ActionButtonGroup } from 'features/actionButtonGroup';
import { FC, useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { UserAvatar } from 'shared/ui';
import { twMerge } from 'tailwind-merge';

interface ContactBarCardProps {
  data: Contact<true>;
}

export const ContactBarCard: FC<ContactBarCardProps> = ({ data }) => {
  const isOpenedContactPage = useAppSelector(selectOpenContactPage);
  const openedContactPageUserId = useAppSelector(selectOpenedContactPageUserId);
  const [hover, setHover] = useState(false);
  const dispatch = useAppDispatch();
  const { user, isFavorite } = data;

  const username = userUtils.getName(user);

  const handleOpenContactPage = useCallback(() => {
    dispatch(openContactPageById(user._id));
    if (!isOpenedContactPage) {
      dispatch(setOpenContactPage());
    }
  }, [data, isOpenedContactPage]);

  return (
    <>
      <div
        className={twMerge(
          'flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-900 px-4 py-3 relative cursor-pointer',
          openedContactPageUserId === user._id ? 'bg-gray-100 dark:bg-gray-900' : '',
        )}
        onMouseLeave={() => setHover(false)}
        onMouseEnter={() => setHover(true)}>
        <div className='flex gap-x-3'>
          <div className='relative h-[50px] w-[50px]'>
            <UserAvatar user={user} className='w-full h-full' />
          </div>
          <div className='flex items-center py-[0.4rem] h-full'>
            <h4 className='text-left text-sm'>{username}</h4>
          </div>
        </div>
        <div className='w-full h-full opacity-50 pointer-events-none absolute top-0 left-0 right-0 bottom-0' />
        <button
          type='button'
          aria-label='открыть страницу контакта'
          onClick={handleOpenContactPage}
          className='absolute w-full h-full top-0 left-0 right-0 bottom-0'
        />
        <div>
          <ActionButtonGroup
            show={hover}
            targetUser={user}
            menuClassName={twMerge('w-[275px]')}
            options={{
              viewProfile: { hr: true },
              audioCall: true,
              videoCall: true,
              sendMessage: { hr: true },
              remove: true,
              report: true,
            }}
          />
        </div>
      </div>
    </>
  );
};
