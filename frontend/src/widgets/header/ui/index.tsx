import Logo from './logo';
import Nav from './nav';
import Notifications from './notifications';
import HeaderProfile from './profile';
import QuickLinks from './quick-navigation';

export const Header = () => {
  return (
    <header className='w-full h-16 md:h-[72px] flex border-b bg-bg border-blue-100 '>
      <Logo />
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
