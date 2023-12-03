import { Component, Suspense, lazy } from 'react';
import { ScaleLoader } from 'react-spinners';
import { wait } from 'shared/lib';

const lazyWithDelay = (factory: () => Promise<any>, delay = 100000) =>
  lazy(() => Promise.all([factory(), wait(delay)]).then(([module]) => module));

const ContactsLeftBar = lazy(() => import('widgets/contacts-leftbar'));
const ContactsWindow = lazy(() => import('widgets/contacts-window'));

class ContactsPage extends Component {
  render() {
    return (
      <div className='relative flex h-full w-full overflow-hidden'>
        <ContactsLeftBar />
        <Suspense
          fallback={
            <div className='flex h-full w-full items-center justify-center'>
              <ScaleLoader className='w-30 h-30 [&>span]:!bg-blue-500' />
            </div>
          }>
          <ContactsWindow />
        </Suspense>
      </div>
    );
  }
}

export default ContactsPage;
