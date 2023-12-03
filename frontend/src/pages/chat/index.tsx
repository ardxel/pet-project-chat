import { Component, ReactNode, Suspense, lazy } from 'react';
import { ScaleLoader } from 'react-spinners';
import ChatOptions from 'widgets/chat-options-sidebar';

const ChatWindow = lazy(() => import('widgets/chat-window'));
const ChatLeftBar = lazy(() => import('widgets/chat-leftbar'));

class ChatPage extends Component {
  render(): ReactNode {
    return (
      <div className='relative flex h-full w-full overflow-hidden'>
        <ChatLeftBar />
        <Suspense
          fallback={
            <div className='flex h-full w-full items-center justify-center'>
              <ScaleLoader className='w-30 h-30 [&>span]:!bg-blue-500' />
            </div>
          }>
          <ChatWindow />
          <ChatOptions />
        </Suspense>
      </div>
    );
  }
}

export default ChatPage;
