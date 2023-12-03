import { Component, ReactNode, Suspense, lazy } from 'react';
import { ScaleLoader } from 'react-spinners';

const ChatWindow = lazy(() => import('widgets/chat-window'));
const ChatLeftBar = lazy(() => import('widgets/chat-leftbar'));
const ChatOptions = lazy(() => import('widgets/chat-options-sidebar'));

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
        </Suspense>
        <ChatOptions />
      </div>
    );
  }
}

export default ChatPage;
