import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { AddContactModal } from 'features/contacts';
import { useState } from 'react';
import { IconWrapper } from 'shared/ui';
export const NewContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        <IconWrapper className='w-8 h-8 p-2'>
          <AddOutlinedIcon />
        </IconWrapper>
      </button>
      <AddContactModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
