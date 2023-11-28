import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { FC, MouseEvent } from 'react';
import { IconWrapper } from 'shared/ui';

interface AddContactButtonProps {
  onClick: (event: MouseEvent<HTMLButtonElement>) => any;
}

export const AddContactButton: FC<AddContactButtonProps> = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick}>
        <IconWrapper className='h-8 w-8 p-2'>
          <AddOutlinedIcon />
        </IconWrapper>
      </button>
    </>
  );
};
