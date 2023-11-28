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
        <div className='fixed inset-0 bg-black bg-opacity-50 transition-colors duration-300 dark:bg-white  dark:bg-opacity-5 '>
          <div className='flex h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'>
              <Dialog.Panel className={twMerge('relative w-full rounded-md bg-aside-bg transition-all xs1:w-80')}>
                <button
                  onClick={onClose}
                  className={twMerge(
                    'absolute -right-3 -top-3 z-[999] h-5 w-5 rounded-full bg-bg p-5 transition-colors',
                    'hover:bg-icon-active-bg  [&>*]:hover:text-icon-active-color',
                  )}>
                  <ClearOutlinedIcon className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform !text-lg' />
                </button>
                <div className='flex h-full w-full flex-col gap-y-6 rounded-md bg-white p-6 dark:!bg-aside-bg'>
                  <h2 className='text-left'>Отключить оповещения</h2>
                  <fieldset className='flex w-full flex-col items-start  gap-y-4'>
                    <label className='flex cursor-pointer items-center font-normal'>
                      <RadioInput
                        onChange={onChange}
                        name='mute-time'
                        className='mr-3 h-4 w-4'
                        defaultChecked
                        value={1}
                      />
                      15 минут
                    </label>

                    <label className='flex cursor-pointer items-center font-normal'>
                      <RadioInput
                        onChange={onChange}
                        name='mute-time'
                        value={2}
                        className='mr-3 h-4 w-4 rounded-full'
                      />
                      1 час
                    </label>

                    <label className='flex cursor-pointer items-center font-normal'>
                      <RadioInput onChange={onChange} name='mute-time' value={3} className='mr-3 h-4 w-4' />1 день
                    </label>

                    <label className='flex cursor-pointer items-center font-normal'>
                      <RadioInput onChange={onChange} name='mute-time' value={4} className='mr-3 h-4 w-4' />
                      Навсегда
                    </label>
                    <div className='mt-2 flex gap-x-3'>
                      <button
                        onClick={onSubmit}
                        className='rounded-md bg-rose-600 px-3 py-2 text-sm text-white transition-colors duration-300 hover:bg-rose-700'>
                        Отключить
                      </button>
                      <button
                        onClick={onClose}
                        className={twMerge(
                          'rounded-md bg-icon-bg px-3 py-2 text-sm text-icon-color',
                          'transition-colors duration-300 hover:bg-icon-active-bg hover:text-icon-active-color',
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
      <button className='h-24 w-20' onClick={() => setOpen(true)}>
        <IconWrapper className='flex flex-col !rounded-md'>
          <NotificationsIcon className='!h-7 !w-7' />
          <p className='text-xs'>Mute</p>
        </IconWrapper>
      </button>
      <MuteModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
});
