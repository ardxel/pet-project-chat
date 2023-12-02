import { Suspense, lazy, useState } from 'react';
import { AddContactButton } from './addContactButton';

const AddContactModal = lazy(() => import('./addContactModal'));

export const AddContact = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AddContactButton onClick={() => setOpen(true)} />
      <Suspense>{open && <AddContactModal isOpen={open} onClose={() => setOpen(false)} />}</Suspense>
    </>
  );
};
