import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import { FC } from 'react';
import { HorizontalTabs, IconWrapper } from 'shared/ui';

interface Props {
  onClick: () => void;
}

export const MediaButton: FC<Props> = ({ onClick }) => {
  return (
    <button className='w-20 h-24' onClick={onClick}>
      <IconWrapper className='flex flex-col !rounded-md'>
        <PermMediaOutlinedIcon className='!w-7 !h-7' />
        <p className='text-xs'>Медиа</p>
      </IconWrapper>
    </button>
  );
};

const items = ['Изобажения', 'Видео', 'Файлы', 'Ссылки'];

export const MediaContainer = () => {
  return <HorizontalTabs className='font-semibold text-xs text-gray-400' items={items} />;
};
