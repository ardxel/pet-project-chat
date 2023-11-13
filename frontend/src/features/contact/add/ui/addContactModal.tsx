import { Dialog, Transition } from '@headlessui/react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { FC, Fragment } from 'react';
import { SearchInput } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
interface AddContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddContactModal: FC<AddContactModalProps> = ({ onClose, isOpen }) => {
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
        <div className='fixed inset-0'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className={twMerge('w-full xs1:w-80 bg-bg rounded-md transition-all')}>
                <button
                  onClick={onClose}
                  className='absolute -right-3 -top-3 bg-bg p-5 w-5 h-5 rounded-full transition-colors hover:bg-icon-active-bg  [&>*]:hover:text-icon-active-color'>
                  <ClearOutlinedIcon className='!text-lg absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-full h-full' />
                </button>
                <div className='flex flex-col w-full h-full p-6 gap-y-6'>
                  <h2 className='text-left'>Найти в контактах</h2>
                  <SearchInput placeholder='Найти контакт / чат' className='rounded-md' />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
