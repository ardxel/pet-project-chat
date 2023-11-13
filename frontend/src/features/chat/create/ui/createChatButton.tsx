import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { FC, MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';

interface NewChatButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => any;
}
export const NewChatButton: FC<NewChatButtonProps> = ({ onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={twMerge(
          '[&>*]:text-form-color [&>*]:!transition-colors [&>*]:!duration-300 [&>*]:hover:text-active-link',
          'text-xs flex items-center gap-x-1',
        )}>
        <AddOutlinedIcon className='!w-4 !h-4' />
        <p className='text-xs'>Новый</p>
      </button>
    </>
  );
};
