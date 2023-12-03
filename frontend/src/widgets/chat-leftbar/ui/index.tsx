import { setSearchChatInput } from 'entities/chats';
import { selectOpenChat } from 'entities/ui-visibility';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { LeftBar } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { ChatList } from './chatlist';
import { LeftbarHeader as Header } from './head';
import { SearchBar } from './searchbar';

interface ChatLeftBarProps {}

const ChatLeftBar: FC<ChatLeftBarProps> = () => {
  const openChat = useAppSelector(selectOpenChat);
  const dispatch = useAppDispatch();

  return (
    <LeftBar className={twMerge(`${!openChat ? 'flex' : 'hidden'}`, 'relative flex-col  overflow-hidden md:flex')}>
      <Header />
      <SearchBar className='flex-shrink-0' onChange={(event) => dispatch(setSearchChatInput(event.target.value))} />
      <ChatList />
    </LeftBar>
  );
};

export default ChatLeftBar;
