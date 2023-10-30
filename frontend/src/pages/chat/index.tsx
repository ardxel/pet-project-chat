import { ReactNode } from 'react';
import { ChatLeftbar } from 'widgets/chat-leftbar';
import { ChatWindow } from 'widgets/chat-window';

const ChatPage = ({ children }: { children?: ReactNode }) => {
  return (
    <div className='flex h-full w-full'>
      <ChatLeftbar />
      <ChatWindow />
      {children}
    </div>
  );
};

export default ChatPage;
