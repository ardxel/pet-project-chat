import { useContactGuard } from '../lib';
import { ContactWindowDescription as Description } from './desc';
import { ContactsWindowHeader as Header } from './head';

export const ContactsWindow = () => {
  const access = useContactGuard();

  if (!access) return null;

  return (
    <div className='p-7 w-full h-full bg-aside-bg scroll'>
      <div className='max-w-[64rem] mx-auto h-full rounded-md'>
        <Header />
        <Description />
      </div>
    </div>
  );
};
