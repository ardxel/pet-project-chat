import { useChatGuard } from '../lib';
import { ChatArea } from './chat-area';
import { ChatHeader } from './head';
import { ChatInput } from './input';

const ChatWindow = () => {
  const access = useChatGuard();

  if (!access) return null;

  return (
    <section className='flex h-full w-full flex-col'>
      <ChatHeader />
      <ChatArea />
      <ChatInput />
    </section>
  );
};

export default ChatWindow;
