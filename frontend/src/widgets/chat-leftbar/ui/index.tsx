import { selectIsHiddenChat, setSearchInput } from 'entities/chats';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { LeftBar } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { ChatList } from './chatlist';
import { LeftbarHeader } from './head';
import { SearchBar } from './searchbar';

interface ChatLeftbarProps {}

export const ChatLeftbar: FC<ChatLeftbarProps> = () => {
  const isHiddenChat = useAppSelector(selectIsHiddenChat);
  const dispatch = useAppDispatch();

  return (
    <LeftBar className={twMerge(`${isHiddenChat ? 'flex' : 'hidden'}`, 'md:flex flex-col  overflow-hidden relative')}>
      <LeftbarHeader />
      <SearchBar className='flex-shrink-0' onChange={(event) => dispatch(setSearchInput(event.target.value))} />
      <ChatList />
    </LeftBar>
  );
};
