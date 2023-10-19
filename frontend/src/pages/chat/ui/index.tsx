import { UserListItem } from 'entities/userListItem';
import { FC } from 'react';
import { SearchInput } from 'shared/ui';
import { LeftBar } from 'widgets';
import { LeftbarHeader } from './head';

const mockUsers = [
  {
    fullname: 'Jasmine Thompson',
    lastMessage: 'Had they visited Rome before',
    date: '45 min',
    avatar: 'https://connectme-html.themeyn.com/images/avatar/3.jpg',
  },
  {
    fullname: 'Konstantin Frank',
    lastMessage: 'Liked that disco music',
    date: '1 days',
    avatar: 'https://connectme-html.themeyn.com/images/avatar/3.jpg',
  },
  {
    fullname: 'Mathias Devos',
    lastMessage: 'Hey, how`s it going?',
    date: '2 days',
    avatar: 'https://connectme-html.themeyn.com/images/avatar/3.jpg',
  },
  {
    fullname: 'Jasmine Thompson',
    lastMessage: 'Had they visited Rome before',
    date: '45 min',
    avatar: 'https://connectme-html.themeyn.com/images/avatar/3.jpg',
  },
  {
    fullname: 'Konstantin Frank',
    lastMessage: 'Liked that disco music',
    date: '1 days',
    avatar: 'https://connectme-html.themeyn.com/images/avatar/3.jpg',
  },
  {
    fullname: 'Mathias Devos',
    lastMessage: 'Hey, how`s it going?',
    date: '2 days',
    avatar: 'https://connectme-html.themeyn.com/images/avatar/3.jpg',
  },
];

interface ChatPageProps {}

const ChatPage: FC<ChatPageProps> = () => {
  return (
    <LeftBar>
      <LeftbarHeader />
      <div className='px-5 mb-4'>
        <SearchInput placeholder='Найти контакт / чат' />
      </div>
      <div className='flex flex-col'>
        {mockUsers.map((user, i) => {
          return <UserListItem key={i} user={user} />;
        })}
      </div>
    </LeftBar>
  );
};

export default ChatPage;
