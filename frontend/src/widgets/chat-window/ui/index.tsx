import { selectIsConnected } from 'entities/chats';
import { selectIsAuthorized } from 'entities/session';
import { useSelector } from 'react-redux';
import { ChatArea } from './chat-area';
import { ChatHeader } from './head';
import { ChatInput } from './input';

export const ChatWindow = () => {
  const isAuthorized = useSelector(selectIsAuthorized);
  const isConnected = useSelector(selectIsConnected);

  if (!isAuthorized && !isConnected) {
    return null;
  }
  return (
    <section className='flex flex-col w-full'>
      <ChatHeader />
      <ChatArea />
      <ChatInput />
    </section>
  );
};
