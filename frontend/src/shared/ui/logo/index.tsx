import AppLogo from 'assets/logo.svg';

export const Logo = () => (
  <div className='relative flex h-full  w-20 items-center justify-center px-6 py-4 transition-all duration-300 md:w-24'>
    <a href='/' className='t-1/2 relative inline-flex h-11 w-11'>
      <AppLogo className='h-full w-full' />
    </a>
  </div>
);
