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
      <Menu.Items as='div' className='dropdown-menu w-[19rem] bg-bg h-[20rem]'>
        <div className='w-full h-12 flex justify-between items-center px-5 py-4 border-border border'>
          <h2 className=' text-left'>Оповещения</h2>
          <HorizontalTabs items={['Новые', 'Все']} />
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default Notifications;
