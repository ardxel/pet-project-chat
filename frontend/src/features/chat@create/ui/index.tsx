import { useState } from 'react';
import { NewChatButton } from './createChatButton';
import { CreateChatModal } from './createChatModal';

export const ChatCreate = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <NewChatButton onClick={() => setOpen(true)} />
      <CreateChatModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};
