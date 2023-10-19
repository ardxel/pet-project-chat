import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { AddChatModal } from 'features/add-chat';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export const NewChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={twMerge(
          '[&>*]:text-form-color [&>*]:!transition-colors [&>*]:!duration-300 [&>*]:hover:text-active-link',
          'text-xs flex items-center gap-x-1',
        )}>
        <AddOutlinedIcon className='!w-4 !h-4' />
        <p className='text-xs'>Новый</p>
      </button>
      <AddChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
