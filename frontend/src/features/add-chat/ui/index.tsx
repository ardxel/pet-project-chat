import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';
import { SearchInput } from 'shared/ui';
import { twMerge } from 'tailwind-merge';

interface AddChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddChatModal: FC<AddChatModalProps> = ({ onClose, isOpen }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-[800]' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className={twMerge('w-full max-w-sm bg-bg rounded-md transition-all')}>
                <div className='flex flex-col w-full h-full p-6'>
                  <h2 className='text-left'>Найти в контактах</h2>
                  <div className='px-5 mb-4 relative'>
                    <SearchInput placeholder='Найти контакт / чат' />
                  </div>{' '}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
