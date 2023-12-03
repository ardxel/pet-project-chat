import { Menu } from '@headlessui/react';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';
import { EmojiClickData } from 'emoji-picker-react';
import { selectCurrentTheme } from 'entities/theme';
import { FC, Suspense, lazy } from 'react';
import { useAppSelector } from 'shared/model';
import { IconWrapper } from 'shared/ui';

const EmojiPicker = lazy(() => import('emoji-picker-react'));

interface AppEmojiPicker {
  onEmojiClick: (emoji: EmojiClickData, mouseEvent: MouseEvent) => void;
}

export const AppEmojiPicker: FC<AppEmojiPicker> = ({ onEmojiClick }) => {
  const theme = useAppSelector(selectCurrentTheme);

  return (
    <Menu as='div' className='dropdown'>
      <Menu.Button className='block'>
        <IconWrapper className={'h-8 w-8 md:h-10 md:w-10'}>
          <TagFacesOutlinedIcon className={'!h-4 !w-4 md:!h-5 md:!w-5'} />
        </IconWrapper>
      </Menu.Button>
      <Menu.Items as='div' className='dropdown-menu bottom-10 left-0 transform'>
        <Suspense>
          <Menu.Item as='div' className='h-[28rem] w-[22rem] overflow-hidden rounded-md'>
            <EmojiPicker
              lazyLoadEmojis
              theme={theme as Exclude<import('emoji-picker-react').Theme, 'auto'>}
              onEmojiClick={(emoji, event) => {
                onEmojiClick(emoji, event);
              }}
            />
          </Menu.Item>
        </Suspense>
      </Menu.Items>
    </Menu>
  );
};
