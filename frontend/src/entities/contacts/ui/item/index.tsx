import { Contact } from 'entities/session';
import { FC, useState } from 'react';
import { AvatarByFirstLetter } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { ListButton as ActionListButton } from './listButton';

interface ContactsListItemProps {
  data: Contact;
}

export const ContactListItem: FC<ContactsListItemProps> = ({ data }) => {
  const { user, isFavorite } = data;
  const [hover, setHover] = useState(false);
  const hasAvatar = Boolean(user.avatar);
  const hasFullname = Boolean(user.firstName && user.lastName);
  return (
    <div
      className='flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-900 px-4 py-3 relative'
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}>
      <div className='flex gap-x-3'>
        <div className='relative'>
          {hasAvatar ? (
            <img
              className={twMerge('rounded-md object-cover overflow-hidden', 'absolute w-full h-full')}
              src={user.avatar}
            />
          ) : (
            <AvatarByFirstLetter name={user.name} className='w-12 h-12' />
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
        <ActionListButton show={hover} />
      </div>
    </div>
  );
};
