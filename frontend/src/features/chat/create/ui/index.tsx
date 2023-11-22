import { useState } from 'react';
import { CreateChatButton } from './createChatButton';
import { CreateChatModal } from './createChatModal';

export const ChatCreate = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateChatButton setOpen={() => setOpen(true)} />
      <CreateChatModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};
