import { FC } from 'react';
import { LeftBar } from 'shared/ui';
import { ChatList } from './chatlist';
import { LeftbarHeader } from './head';
import { SearchBar } from './searchbar';

interface ChatLeftbarProps {}

const ChatLeftbar: FC<ChatLeftbarProps> = () => {
  return (
    <LeftBar>
      <LeftbarHeader />
      <SearchBar />
      <ChatList />
    </LeftBar>
  );
};

export default ChatLeftbar;
