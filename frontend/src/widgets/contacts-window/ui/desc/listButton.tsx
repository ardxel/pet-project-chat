import { Menu } from '@headlessui/react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { selectOpenedPageContactData } from 'entities/contacts';
import { FC } from 'react';
import { useAppSelector } from 'shared/model';
import { IconWrapper } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { ContactWindowActionButtons } from './actionButtons';

interface ContactWindowListButtonProps {
  className?: string;
}
export const ContactWindowListButton: FC<ContactWindowListButtonProps> = ({ className }) => {
  const contact = useAppSelector(selectOpenedPageContactData);
  return (
    <Menu as='div' className='dropdown'>
      {({ close }) => (
        <>
          <Menu.Button className={twMerge('w-10 h-10', className)}>
            <IconWrapper className='bg-white dark:bg-bg dark:hover:bg-icon-active-bg'>
              <MoreHorizIcon />
            </IconWrapper>
          </Menu.Button>
          <Menu.Items as='div' className='dropdown-menu w-[300px] !mt-0 [&>*]:px-4 [&>*]:py-4'>
            <ContactWindowActionButtons onClose={close} />
          </Menu.Items>
        </>
      )}
    </Menu>
  );
};
