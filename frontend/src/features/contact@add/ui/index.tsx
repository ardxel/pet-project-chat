import { useState } from 'react';
import { AddContactButton } from './addContactButton';
import { AddContactModal } from './addContactModal';

export const AddContact = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AddContactButton onClick={() => setOpen(true)} />
      <AddContactModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
};
