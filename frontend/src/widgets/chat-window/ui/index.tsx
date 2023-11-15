import { selectIsAuthorized, selectSocketStatus } from 'entities/session';
import { useAppSelector } from 'shared/model';
import { ChatArea } from './chat-area';
import { ChatHeader } from './head';
import { ChatInput } from './input';

export const ChatWindow = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const connectionStatus = useAppSelector(selectSocketStatus);
  const isConnected = connectionStatus === 'connected';

  if (!isAuthorized && !isConnected) {
    return null;
  }

  return (
    <section className='flex flex-col w-full h-full'>
      <ChatHeader />
      <ChatArea />
      <ChatInput />
    </section>
  );
};
