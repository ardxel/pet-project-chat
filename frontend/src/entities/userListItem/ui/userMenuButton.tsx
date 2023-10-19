import { Menu } from '@headlessui/react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { FC } from 'react';
import { IconWrapper } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { CategoryListActions, CategoryListMarkAsRead, CatergoryListCommunications } from './categoryLists';

interface UserListItemMenuButtonProps {
  show: boolean;
  className?: string;
}

export const MenuButton: FC<UserListItemMenuButtonProps> = ({ show, className }) => {
  if (show) {
    return (
      <Menu as='div' className='dropdown'>
        <Menu.Button className={twMerge('w-10 h-10', className)}>
          <IconWrapper className='bg-white dark:bg-bg dark:hover:bg-icon-active-bg'>
            <MoreHorizIcon />
          </IconWrapper>
        </Menu.Button>
        <Menu.Items as='div' className='dropdown-menu w-64 !mt-0 [&>*]:px-4 [&>*]:py-4'>
          <CategoryListMarkAsRead />
          <CatergoryListCommunications />
          <CategoryListActions />
        </Menu.Items>
      </Menu>
    );
  }
  return null;
};
