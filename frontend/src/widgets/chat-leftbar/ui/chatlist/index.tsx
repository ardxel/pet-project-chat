import { ChatListItem } from 'entities/chatItem';

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

export const ChatList = () => {
  return (
    <div className='flex flex-col'>
      {mockUsers.map((user, i) => {
        return <ChatListItem key={i} user={user} />;
      })}
    </div>
  );
};
