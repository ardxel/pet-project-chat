import { Logo } from 'shared/ui';
import Nav from './nav';
import Notifications from './notifications';
import HeaderProfile from './profile';
import QuickLinks from './quick-navigation';

export const Header = () => {
  return (
    <header className='w-full flex flex-grow-0 flex-shrink-0 h-16 md:h-[72px] border-b bg-bg border-blue-100 '>
      <div className='border-r border-border'>
        <Logo />
      </div>
      <div className='flex items-center justify-end xs2:justify-between w-full '>
        <Nav />
        <div className='flex items-center gap-x-5 ml-5 pr-6'>
          <QuickLinks />

          <Notifications />

          <HeaderProfile />
        </div>
      </div>
    </header>
  );
};
