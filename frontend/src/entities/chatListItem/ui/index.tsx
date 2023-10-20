import { FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { MenuButton } from './menuButton';

const mockUser = {
  fullname: 'Jasmine Thompson',
  lastMessage: 'Had they visited Rome before',
  date: '45 min',
  avatar: 'https://connectme-html.themeyn.com/images/avatar/3.jpg',
};

interface ChatListItemProps {
  user?: Partial<typeof mockUser>;
}

export const ChatListItem: FC<ChatListItemProps> = ({ user }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className='flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-900 px-4 py-3 relative'
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}>
      <div className='flex gap-x-3'>
        <div className='relative w-[50px] h-[50px]'>
          <img
            className={twMerge('rounded-md object-cover overflow-hidden', 'absolute w-full h-full')}
            src={user.avatar}
          />
        </div>
        <div>
          <h4 className='text-left text-sm'>{user.fullname}</h4>
          <div>
            <p className='text-xs mt-1'>{user.lastMessage}</p>
          </div>
        </div>
      </div>
      <div>
        <MenuButton show={hover} />
      </div>
    </div>
  );
};
