import { Menu } from '@headlessui/react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FC, useRef } from 'react';
import { useAdaptiveMenuPosition } from 'shared/model';
import { IconWrapper } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { ActionList } from './actionList';

interface UserListItemMenuButtonProps {
  show: boolean;
  className?: string;
  chatId: string;
}

export const MenuButton: FC<UserListItemMenuButtonProps> = ({ chatId, show, className }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const position = useAdaptiveMenuPosition(btnRef, [show], { menuHeight: 550 });

  if (!show) return null;

  return (
    <Menu as='div' className='dropdown'>
      {({ close }) => (
        <>
          <Menu.Button
            className={twMerge('w-10 h-10', className)}
            ref={btnRef}
            onClick={(event) => event.stopPropagation()}>
            <IconWrapper className='bg-white dark:bg-bg dark:hover:bg-icon-active-bg'>
              <MoreHorizIcon />
            </IconWrapper>
          </Menu.Button>
          <Menu.Items
            as='div'
            className={twMerge(
              'dropdown-menu w-[300px] !mt-0 [&>*]:px-4 [&>*]:py-4',
              position === 'top' ? 'bottom-10' : 'top-10',
            )}>
            <ActionList chatId={chatId} onClose={close} />
          </Menu.Items>
        </>
      )}
    </Menu>
  );
};
