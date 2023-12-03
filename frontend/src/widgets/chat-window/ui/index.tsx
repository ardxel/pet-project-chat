import { selectOpenChat } from 'entities/ui-visibility';
import { useAppSelector } from 'shared/model';
import { useChatGuard } from '../lib';
import { ChatArea } from './chat-area';
import { ChatHeader } from './head';
import { ChatInput } from './input';

const ChatWindow = () => {
  const access = useChatGuard();
  const open = useAppSelector(selectOpenChat);

  if (!access || !open) return null;

  return (
    <section className='flex h-full w-full flex-col'>
      <ChatHeader />
      <ChatArea />
      <ChatInput />
    </section>
  );
};

export default ChatWindow;
