import AppLogo from 'assets/logo.svg';

export const Logo = () => (
  <div className='h-full w-20 md:w-24  transition-all duration-300 flex justify-center items-center py-4 px-6 relative'>
    <a href='/' className='w-11 h-11 inline-flex relative t-1/2'>
      <AppLogo className='w-full h-full' />
    </a>
  </div>
);
