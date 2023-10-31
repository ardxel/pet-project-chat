import { Menu } from '@headlessui/react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FC, useEffect, useRef, useState } from 'react';
import { IconWrapper } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { ActionList } from './actionList';

interface UserListItemMenuButtonProps {
  show: boolean;
  className?: string;
}

export const MenuButton: FC<UserListItemMenuButtonProps> = ({ show, className }) => {
  const [menuPosition, setMenuPosition] = useState<'top' | 'bottom'>('top');
  const btnRef = useRef<HTMLButtonElement>(null);
  const MENU_HEIGHT = 550;

  useEffect(() => {
    if (btnRef.current) {
      const btnRect = btnRef.current.getBoundingClientRect();
      setMenuPosition(btnRect.top <= MENU_HEIGHT ? 'bottom' : 'top');
    }
  }, [show]);

  if (show) {
    return (
      <Menu as='div' className='dropdown'>
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
            menuPosition === 'top' ? 'bottom-10' : 'top-10',
          )}>
          <ActionList />
        </Menu.Items>
      </Menu>
    );
  }
  return null;
};
