import PermMediaOutlinedIcon from '@mui/icons-material/PermMediaOutlined';
import { FC } from 'react';
import { HorizontalTabs, IconWrapper } from 'shared/ui';

interface Props {
  onClick: () => void;
  focus?: boolean;
}

export const MediaButton: FC<Props> = ({ onClick, focus }) => {
  return (
    <button className='h-24 w-20' onClick={onClick}>
      <IconWrapper focus={focus} className='flex flex-col !rounded-md'>
        <PermMediaOutlinedIcon className='!h-7 !w-7' />
        <p className='text-xs'>Медиа</p>
      </IconWrapper>
    </button>
  );
};

const items = ['Изображения', 'Видео', 'Файлы', 'Ссылки'];

export const MediaContainer = () => {
  return <HorizontalTabs className='text-xs font-semibold text-gray-400' items={items} />;
};
