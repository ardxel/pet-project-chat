import { Logo } from 'shared/ui';
import Nav from './nav';
import Notifications from './notifications';
import HeaderProfile from './profile';
import QuickLinks from './quick-navigation';

export const Header = () => {
  return (
    <header className='flex h-16 w-full flex-shrink-0 flex-grow-0 border-b border-border bg-bg md:h-[72px] '>
      <div className='border-r border-border'>
        <Logo />
      </div>
      <div className='flex w-full items-center justify-end xs2:justify-between '>
        <Nav />
        <div className='ml-5 flex items-center gap-x-5 pr-6'>
          <QuickLinks />

          <Notifications />

          <HeaderProfile />
        </div>
      </div>
    </header>
  );
};
