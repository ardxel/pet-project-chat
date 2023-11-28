import { Dialog } from '@headlessui/react';
import { FC, ReactNode, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface CallModalProps {
  open: boolean;
  children: ReactNode;
}

export const CallModal: FC<CallModalProps> = ({ open, children }) => {
  const [fade, setFade] = useState(false);
  const timeout = useRef<NodeJS.Timeout>(null);

  const onTryClose = () => {
    clearTimeout(timeout.current);
    setFade(true);
    timeout.current = setTimeout(() => {
      setFade(false);
    }, 200);
  };

  return (
    <Dialog as='div' open={open} className={twMerge('relative z-[999]')} onClose={onTryClose}>
      <div className='fixed inset-0 bg-black bg-opacity-50 transition-colors duration-300 dark:bg-white  dark:bg-opacity-10 ' />
      <div className='fixed inset-0'>
        <div
          className={twMerge(
            'flex h-full items-center justify-center p-4 text-center',
            'transition-all duration-300',
            fade ? 'scale-[1.2]' : 'scale-100',
          )}>
          <Dialog.Panel className={twMerge('relative rounded-md bg-bg transition-all')}>{children}</Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
