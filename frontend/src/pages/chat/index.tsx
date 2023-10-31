import ChatLeftbar from 'widgets/chat-leftbar';
import ChatWindow from 'widgets/chat-window';

const ChatPage = () => {
  return (
    <div className='flex h-full w-full overflow-hidden'>
      <ChatLeftbar />
      <ChatWindow />
    </div>
  );
};

export default ChatPage;
