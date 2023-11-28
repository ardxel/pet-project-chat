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
      <HorizontalTabs className='text-xs font-semibold text-gray-400' onSelect={setSelected} items={items} />
      <div className='mt-8 flex w-full flex-col'>
        {selected === 1 ? (
          <div className='flex w-full flex-col gap-y-6'>
            <button className='flex h-10 w-full items-center gap-x-3'>
              <IconWrapper
                className={twMerge(
                  '[&>*]hover:dark:!text-gray-800 h-12 w-12 !rounded-md dark:!bg-gray-100  hover:dark:!bg-gray-100 [&>*]:dark:!text-gray-800 ',
                  'hover:bg-icon-bg [&>*]:hover:text-icon-color',
                )}>
                <PersonRemoveIcon className='!h-7 !w-7' />
              </IconWrapper>

              <div className='flex h-full flex-col items-start'>
                <h6 className='text-sm font-normal'>Заблокировать</h6>
                <p className='mt-1 text-xs'>{displayedName} не будет в ваших контактах</p>
              </div>
            </button>
            <button className='flex h-10 w-full items-center gap-x-3'>
              <IconWrapper
                className={twMerge(
                  '[&>*]hover:dark:!text-gray-800 h-12 w-12 !rounded-md dark:!bg-gray-100  hover:dark:!bg-gray-100 [&>*]:dark:!text-gray-800 ',
                  'hover:bg-icon-bg [&>*]:hover:text-icon-color',
                )}>
                <ReportProblemIcon className='!h-7 !w-7' />
              </IconWrapper>

              <div className='flex h-full flex-col items-start'>
                <h6 className='text-sm font-normal'>Пожаловаться</h6>
                <p className='mt-1 text-xs'>Оставить заявку в обратной связи</p>
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
    <button className='h-24 w-20' onClick={onClick}>
      <IconWrapper focus={focus} className='flex flex-col !rounded-md'>
        <TuneOutlinedIcon className='!h-7 !w-7' />
        <p className='text-xs'>Опции</p>
      </IconWrapper>
    </button>
  );
};
