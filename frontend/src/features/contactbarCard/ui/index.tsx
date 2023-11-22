import { Contact } from 'entities/session';
import { FC, useState } from 'react';
import { UserAvatar } from 'shared/ui';
import { ListButton as ActionListButton } from './listButton';

interface ContactBarCardProps {
  data: Contact;
}

export const ContactBarCard: FC<ContactBarCardProps> = ({ data }) => {
  const { user, isFavorite } = data;
  const [hover, setHover] = useState(false);
  const hasFullname = Boolean(user.firstName && user.lastName);
  return (
    <div
      className='flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-900 px-4 py-3 relative'
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}>
      <div className='flex gap-x-3'>
        <div className='relative h-[50px] w-[50px]'>
          <UserAvatar user={user} className='w-full h-full' />
        </div>
        <div className='flex items-center py-[0.4rem] h-full'>
          <h4 className='text-left text-sm'>{hasFullname ? user.firstName + ' ' + user.lastName : user.name}</h4>
        </div>
      </div>
      <div>
        <ActionListButton show={hover} user={user} />
      </div>
    </div>
  );
};
