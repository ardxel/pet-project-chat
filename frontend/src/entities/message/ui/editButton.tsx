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
          <IconWrapper className='h-8 w-8 bg-transparent !p-2'>
            <MoreHorizIcon className='!h-4 !w-4' />
          </IconWrapper>
        </Menu.Button>
        <Menu.Items
          static={open}
          className={twMerge(
            'absolute z-[999] flex min-w-[96px] flex-col rounded-md border border-border bg-bg',
            '!mt-0 w-[150px] gap-y-4 p-4',
            position === 'top'
              ? 'bottom-9 left-1/2 -translate-x-1/2 transform'
              : 'left-1/2 top-9 -translate-x-1/2 transform',
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
