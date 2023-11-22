import { Component, ReactNode } from 'react';
import ChatLeftBar from 'widgets/chat-leftbar';
import { ChatOptions } from 'widgets/chat-options-sidebar';
import ChatWindow from 'widgets/chat-window';

class ChatPage extends Component {
  render(): ReactNode {
    return (
      <div className='flex h-full w-full overflow-hidden relative'>
        <ChatLeftBar />
        <ChatWindow />
        <ChatOptions />
      </div>
    );
  }
}

export default ChatPage;
