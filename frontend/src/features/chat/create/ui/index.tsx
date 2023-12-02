import { Suspense, lazy, useState } from 'react';
import { CreateChatButton } from './createChatButton';

const CreateChatModal = lazy(() => import('./createChatModal'));

export const ChatCreate = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <CreateChatButton setOpen={() => setOpen(true)} />
      <Suspense>{open && <CreateChatModal isOpen={open} onClose={() => setOpen(false)} />}</Suspense>
    </>
  );
};
