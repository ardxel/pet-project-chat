import { useContactGuard } from '../lib';
import { ContactWindowDescription as Description } from './desc';
import { ContactsWindowHeader as Header } from './head';

const ContactsWindow = () => {
  const access = useContactGuard();

  if (!access) return null;

  return (
    <div className='scroll h-full w-full bg-aside-bg p-7'>
      <div className='mx-auto h-full max-w-[75rem] rounded-md'>
        <Header />
        <Description />
      </div>
    </div>
  );
};

export default ContactsWindow;
