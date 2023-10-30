import { Menu } from '@headlessui/react';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { IMessage, selectOpenedChatCompanion } from 'entities/chats';
import { selectUserId } from 'entities/session';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'shared/model';
import { AvatartByFirstLetter, DropdownListItem, IconWrapper } from 'shared/ui';
import { twMerge } from 'tailwind-merge';

interface ChatMessageEditButtonProps {
  show: boolean;
  open: boolean;
}

const ChatMessageEditButton: FC<ChatMessageEditButtonProps> = ({ show, open }) => {
  const [menuPosition, setMenuPosition] = useState<'top' | 'bottom'>('top');
  const btnRef = useRef<HTMLButtonElement>(null);
  /**
   * 130 означает высоту одного элемента DropdownListItem (приблизительно)
   * если добавлять в меню новые элементы, то придется корректировать значение.
   */
  const MENU_HEIGHT = 130 * 2;

  /**
   * Если меню кнопок выходит за пределы чата сверху,
   * то тогда отображать снизу, а если нет, то сверху
   */
  const calculateMenuPosition = useCallback(() => {
    if (btnRef.current) {
      const btnRect = btnRef.current.getBoundingClientRect();
      setMenuPosition(btnRect.top <= MENU_HEIGHT ? 'bottom' : 'top');
    }
  }, []);

  useEffect(() => {
    calculateMenuPosition();
  }, [show]);

  if (show) {
    return (
      <Menu className='dropdown' as='div'>
        <Menu.Button as='button' ref={btnRef}>
          <IconWrapper className='w-8 h-8 bg-transparent !p-2'>
            <MoreHorizIcon className='!w-4 !h-4' />
          </IconWrapper>
        </Menu.Button>
        <Menu.Items
          static={open}
          className={twMerge(
            'absolute bg-bg flex flex-col z-[999] min-w-[96px] border border-border rounded-md',
            'w-[150px] gap-y-4 p-4 !mt-0',
            `max-h-[${MENU_HEIGHT}]`,
            menuPosition === 'top'
              ? 'bottom-9 left-1/2 -translate-x-1/2 transform'
              : 'top-9 left-1/2 -translate-x-1/2 transform',
          )}
          as='div'>
          <DropdownListItem as='button' Icon={<DriveFileRenameOutlineOutlinedIcon />} text='Изменить' />
          <DropdownListItem as='button' Icon={<DeleteOutlineOutlinedIcon />} text='Удалить' />
        </Menu.Items>
      </Menu>
    );
  }
  return null;
};

interface ChatMessageProps {
  message: IMessage;
  showAvatar?: boolean;
}

export const ChatMessage: FC<ChatMessageProps> = ({ message, showAvatar }) => {
  const userId = useAppSelector(selectUserId);
  const companion = useAppSelector(selectOpenedChatCompanion);

  const [isHover, setIsHover] = useState(false);
  const [isPressing, setPressing] = useState(false);
  const timeout = useRef(null);

  const { text, sender } = message;
  const SHOW_MENU_DELAY = 500;

  const handleMouseDown = () => {
    timeout.current = setTimeout(() => {
      setPressing(true);
    }, SHOW_MENU_DELAY);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
    clearTimeout(timeout.current);
    setPressing(false);
  };

  const hasAvatar = Boolean(companion.avatar);
  const isUserMsg = userId === sender;
  const isTextMsg = typeof text === 'string';
  const isBgBlue = Boolean(isUserMsg && isTextMsg);

  return (
    <div
      className={twMerge(
        'w-11/12 md:w-10/12 xl:w-2/3 2xl:w-2/5 relative flex cursor-pointer ml-10',
        isUserMsg ? 'self-end justify-end' : 'self-start',
      )}>
      <div
        className='inline-flex items-center relative gap-x-3'
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={handleMouseLeave}>
        <div className='absolute -left-11 bottom-0'>
          {showAvatar && (
            <div className='relative w-[35px] h-[35px]'>
              {hasAvatar ? (
                <img
                  className={twMerge('rounded-md object-cover overflow-hidden', 'absolute w-full h-full')}
                  src={companion.avatar}
                />
              ) : (
                <AvatartByFirstLetter
                  className='rounded-full [&>*]:!text-xl [&>*]:!leading-none [&>*]:-top-[11%]'
                  name={companion.name}
                />
              )}
            </div>
          )}
        </div>
        <div className={twMerge('py-3 px-4  rounded-md flex break-all', isBgBlue ? 'bg-icon-active-color' : 'bg-bg')}>
          <p className={twMerge(isBgBlue ? 'text-white' : '')}>{text}</p>
        </div>
        <div
          className={twMerge(
            'w-10 h-10 flex justify-center items-center absolute',
            isUserMsg ? '-left-11' : '-right-11',
          )}>
          <ChatMessageEditButton show={isHover} open={isPressing} />
        </div>
      </div>
    </div>
  );
};
