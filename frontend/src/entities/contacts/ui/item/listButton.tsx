import { Menu } from '@headlessui/react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FC } from 'react';
import { IconWrapper } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { ActionList } from './actionList';

interface UserActionListButtonProps {
  show: boolean;
  className?: string;
}
export const ListButton: FC<UserActionListButtonProps> = ({ show, className }) => {
  if (show) {
    return (
      <Menu as='div' className='dropdown'>
        <Menu.Button className={twMerge('w-10 h-10', className)}>
          <IconWrapper className='bg-white dark:bg-bg dark:hover:bg-icon-active-bg'>
            <MoreHorizIcon />
          </IconWrapper>
        </Menu.Button>
        <Menu.Items as='div' className='dropdown-menu w-[300px] !mt-0 [&>*]:px-4 [&>*]:py-4'>
          <ActionList />
        </Menu.Items>
      </Menu>
    );
  }
  return null;
};
