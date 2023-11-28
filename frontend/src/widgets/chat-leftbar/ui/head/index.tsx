import { ChatCreate } from 'features/chat/create';
import { FC } from 'react';
import { FilterButton } from './filter.button';

interface LeftbarHeaderProps {}

export const LeftbarHeader: FC<LeftbarHeaderProps> = () => {
  return (
    <div className='flex w-full flex-shrink-0 items-center justify-between px-6 py-5'>
      <h1 className='text-xl'>Chats</h1>
      <div className='flex gap-x-3'>
        <ChatCreate />
        <FilterButton />
      </div>
    </div>
  );
};
