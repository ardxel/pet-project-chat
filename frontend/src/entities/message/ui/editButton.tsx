import { Menu } from '@headlessui/react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FC, useRef } from 'react';
import { useAdaptiveMenuPosition } from 'shared/model';
import { DropdownListItem, IconWrapper } from 'shared/ui';
import { twMerge } from 'tailwind-merge';

interface ChatMessageEditButtonProps {
  show: boolean;
  open: boolean;
  onDelete: () => void;
  onEdit: () => void;
}

export const ChatMessageEditButton: FC<ChatMessageEditButtonProps> = ({ show, open, onDelete, onEdit }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const position = useAdaptiveMenuPosition(btnRef, [show], { menuHeight: 300 });

  if (show) {
    return (
      <Menu className='dropdown' as='div'>
        <Menu.Button as='button' ref={btnRef}>
          <IconWrapper className='w-8 h-8 bg-transparent !p-2'>
            <MoreHorizIcon className='!w-4 !h-4' />
          </IconWrapper>
        </Menu.Button>
        <Menu.Items
          static={open}
          className={twMerge(
            'absolute bg-bg flex flex-col z-[999] min-w-[96px] border border-border rounded-md',
            'w-[150px] gap-y-4 p-4 !mt-0',
            position === 'top'
              ? 'bottom-9 left-1/2 -translate-x-1/2 transform'
              : 'top-9 left-1/2 -translate-x-1/2 transform',
          )}
          as='div'>
          <DropdownListItem
            as='button'
            Icon={<DriveFileRenameOutlineOutlinedIcon />}
            text='Изменить'
            onClick={onEdit}
          />
          <DropdownListItem as='button' Icon={<DeleteOutlineOutlinedIcon />} text='Удалить' onClick={onDelete} />
        </Menu.Items>
      </Menu>
    );
  }
  return null;
};
