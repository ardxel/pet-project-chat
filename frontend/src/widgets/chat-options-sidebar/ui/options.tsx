import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { selectOpenedChatCompanion } from 'entities/chats';
import { FC, useState } from 'react';
import { useAppSelector } from 'shared/model';
import { HorizontalTabs, IconWrapper } from 'shared/ui';
import { twMerge } from 'tailwind-merge';

const items = ['Изменить', 'Блокировать'];

export const OptionsContainer = () => {
  const [selected, setSelected] = useState(0);
  const companion = useAppSelector(selectOpenedChatCompanion);
  const displayedName = companion.firstName ? companion.firstName : companion.name;

  return (
    <>
      <HorizontalTabs className='font-semibold text-xs text-gray-400' onSelect={setSelected} items={items} />
      <div className='w-full flex flex-col mt-8'>
        {selected === 1 ? (
          <div className='flex flex-col gap-y-6 w-full'>
            <button className='h-10 w-full flex items-center gap-x-3'>
              <IconWrapper
                className={twMerge(
                  'h-12 w-12 !rounded-md dark:!bg-gray-100 hover:dark:!bg-gray-100  [&>*]:dark:!text-gray-800 [&>*]hover:dark:!text-gray-800 ',
                  '[&>*]:hover:text-icon-color hover:bg-icon-bg',
                )}>
                <PersonRemoveIcon className='!h-7 !w-7' />
              </IconWrapper>

              <div className='flex flex-col items-start h-full'>
                <h6 className='text-sm font-normal'>Заблокировать</h6>
                <p className='text-xs mt-1'>{displayedName} не будет в ваших контактах</p>
              </div>
            </button>
            <button className='h-10 w-full flex items-center gap-x-3'>
              <IconWrapper
                className={twMerge(
                  'h-12 w-12 !rounded-md dark:!bg-gray-100 hover:dark:!bg-gray-100  [&>*]:dark:!text-gray-800 [&>*]hover:dark:!text-gray-800 ',
                  '[&>*]:hover:text-icon-color hover:bg-icon-bg',
                )}>
                <ReportProblemIcon className='!h-7 !w-7' />
              </IconWrapper>

              <div className='flex flex-col items-start h-full'>
                <h6 className='text-sm font-normal'>Пожаловаться</h6>
                <p className='text-xs mt-1'>Оставить заявку в обратной связи</p>
              </div>
            </button>
          </div>
        ) : null}
      </div>
    </>
  );
};

interface Props {
  onClick: () => void;
  focus?: boolean;
}

export const OptionsButton: FC<Props> = ({ onClick, focus }) => {
  return (
    <button className='w-20 h-24' onClick={onClick}>
      <IconWrapper focus={focus} className='flex flex-col !rounded-md'>
        <TuneOutlinedIcon className='!w-7 !h-7' />
        <p className='text-xs'>Опции</p>
      </IconWrapper>
    </button>
  );
};
