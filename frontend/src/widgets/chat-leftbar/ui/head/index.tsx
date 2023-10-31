import { ChatCreate } from 'features/chat@create';
import { FC } from 'react';
import { FilterButton } from './filter.button';

interface LeftbarHeaderProps {}

export const LeftbarHeader: FC<LeftbarHeaderProps> = () => {
  return (
    <div className='w-full py-5 px-6 flex items-center justify-between flex-shrink-0'>
      <h1 className='text-xl'>Chats</h1>
      <div className='flex gap-x-3'>
        <ChatCreate />
        <FilterButton />
      </div>
    </div>
  );
};
