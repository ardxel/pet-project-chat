import { Menu } from '@headlessui/react';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { HorizontalTabs, IconWrapper } from 'shared/ui';

const Notifications = () => {
  return (
    <Menu className='dropdown' as='div'>
      <Menu.Button>
        <IconWrapper className='header-icon'>
          <NotificationsIcon />
        </IconWrapper>
      </Menu.Button>
      <Menu.Items as='div' className='dropdown-menu h-[20rem] w-[19rem] bg-bg'>
        <div className='flex h-12 w-full items-center justify-between border border-border px-5 py-4'>
          <h2 className=' text-left'>Оповещения</h2>
          <HorizontalTabs items={['Новые', 'Все']} />
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default Notifications;
