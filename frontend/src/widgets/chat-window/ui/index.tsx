import { useChatGuard } from '../lib';
import { ChatArea } from './chat-area';
import { ChatHeader } from './head';
import { ChatInput } from './input';

export const ChatWindow = () => {
  const access = useChatGuard();

  if (!access) return null;

  return (
    <section className='flex flex-col w-full h-full'>
      <ChatHeader />
      <ChatArea />
      <ChatInput />
    </section>
  );
};
