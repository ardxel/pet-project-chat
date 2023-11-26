import { Dialog, Transition } from '@headlessui/react';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { ChangeEvent, Fragment, memo, useState } from 'react';
import { IconWrapper, RadioInput } from 'shared/ui';
import { twMerge } from 'tailwind-merge';

interface MuteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const muteTimeMap = {
  '1': '15 мин',
  '2': '1 час',
  '3': '1 день',
  '4': 'Навсегда',
};

export const MuteModal = ({ isOpen, onClose }: MuteModalProps) => {
  const [time, setTime] = useState('1');

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);
  };
  // TODO
  const onSubmit = () => {
    onClose();
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-[1000]' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'>
          <div />
        </Transition.Child>
        <div className='fixed inset-0 bg-opacity-50 dark:bg-opacity-5 transition-colors duration-300 bg-black  dark:bg-white '>
          <div className='flex h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className={twMerge('w-full relative xs1:w-80 bg-aside-bg rounded-md transition-all')}>
                <button
                  onClick={onClose}
                  className={twMerge(
                    'absolute -right-3 z-[999] -top-3 bg-bg p-5 w-5 h-5 rounded-full transition-colors',
                    'hover:bg-icon-active-bg  [&>*]:hover:text-icon-active-color',
                  )}>
                  <ClearOutlinedIcon className='!text-lg absolute left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-full h-full' />
                </button>
                <div className='w-full h-full flex flex-col bg-white dark:!bg-aside-bg p-6 gap-y-6 rounded-md'>
                  <h2 className='text-left'>Отключить оповещения</h2>
                  <fieldset className='w-full flex flex-col items-start  gap-y-4'>
                    <label className='flex items-center font-normal cursor-pointer'>
                      <RadioInput
                        onChange={onChange}
                        name='mute-time'
                        className='mr-3 w-4 h-4'
                        defaultChecked
                        value={1}
                      />
                      15 минут
                    </label>

                    <label className='flex items-center font-normal cursor-pointer'>
                      <RadioInput
                        onChange={onChange}
                        name='mute-time'
                        value={2}
                        className='mr-3 w-4 h-4 rounded-full'
                      />
                      1 час
                    </label>

                    <label className='flex items-center font-normal cursor-pointer'>
                      <RadioInput onChange={onChange} name='mute-time' value={3} className='mr-3 w-4 h-4' />1 день
                    </label>

                    <label className='flex items-center font-normal cursor-pointer'>
                      <RadioInput onChange={onChange} name='mute-time' value={4} className='mr-3 w-4 h-4' />
                      Навсегда
                    </label>
                    <div className='flex gap-x-3 mt-2'>
                      <button
                        onClick={onSubmit}
                        className='bg-rose-600 rounded-md px-3 py-2 text-sm text-white hover:bg-rose-700 transition-colors duration-300'>
                        Отключить
                      </button>
                      <button
                        onClick={onClose}
                        className={twMerge(
                          'bg-icon-bg text-icon-color rounded-md px-3 py-2 text-sm',
                          'hover:bg-icon-active-bg hover:text-icon-active-color transition-colors duration-300',
                        )}>
                        Закрыть
                      </button>
                    </div>
                  </fieldset>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const MuteButton = memo(() => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className='w-20 h-24' onClick={() => setOpen(true)}>
        <IconWrapper className='flex flex-col !rounded-md'>
          <NotificationsIcon className='!w-7 !h-7' />
          <p className='text-xs'>Mute</p>
        </IconWrapper>
      </button>
      <MuteModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
});
