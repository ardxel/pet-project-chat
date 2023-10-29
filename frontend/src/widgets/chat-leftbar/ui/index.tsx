import { selectIsHiddenChat } from 'entities/chats';
import { FC } from 'react';
import { useAppSelector } from 'shared/model';
import { LeftBar } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { ChatList } from './chatlist';
import { LeftbarHeader } from './head';
import { SearchBar } from './searchbar';

interface ChatLeftbarProps {}

export const ChatLeftbar: FC<ChatLeftbarProps> = () => {
  const isHiddenChat = useAppSelector(selectIsHiddenChat);

  return (
    <LeftBar className={twMerge(`${isHiddenChat ? 'block' : 'hidden'}`, 'md:block')}>
      <LeftbarHeader />
      <SearchBar />
      <ChatList />
    </LeftBar>
  );
};
