import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface CreateChatButtonProps {
  setOpen: () => void;
}

export const CreateChatButton: FC<CreateChatButtonProps> = ({ setOpen }) => {
  return (
    <button
      onClick={setOpen}
      className={twMerge(
        '[&>*]:text-form-color [&>*]:!transition-colors [&>*]:!duration-300 [&>*]:hover:text-active-link',
        'flex items-center gap-x-1 text-xs',
      )}>
      <AddOutlinedIcon className='!h-4 !w-4' />
      <p className='text-xs'>Новый</p>
    </button>
  );
};
