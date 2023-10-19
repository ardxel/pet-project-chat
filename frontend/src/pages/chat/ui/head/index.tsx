import { FC } from 'react';
import { FilterButton } from './filter.button';
import { NewChatButton } from './new-chat.button';

interface LeftbarHeaderProps {}

export const LeftbarHeader: FC<LeftbarHeaderProps> = () => {
  return (
    <div className='w-full py-5 px-6 flex items-center justify-between'>
      <h1 className='text-xl'>Chats</h1>
      <div className='flex gap-x-3'>
        <NewChatButton />
        <FilterButton />
      </div>
    </div>
  );
};
