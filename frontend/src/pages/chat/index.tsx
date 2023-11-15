import ChatLeftbar from 'widgets/chat-leftbar';
import { ChatOptions } from 'widgets/chat-options-sidebar';
import ChatWindow from 'widgets/chat-window';

const ChatPage = () => {
  return (
    <div className='flex h-full w-full overflow-hidden relative'>
      <ChatLeftbar />
      <ChatWindow />
      <ChatOptions />
    </div>
  );
};

export default ChatPage;
