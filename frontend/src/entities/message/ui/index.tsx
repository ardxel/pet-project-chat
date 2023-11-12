import { IMessage, selectOpenedChatCompanion, setEditableMessage } from 'entities/chats';
import { selectUserId } from 'entities/session';
import { deleteMessageThunk } from 'features/message@delete';
import { FC, useCallback, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { AvatartByFirstLetter } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { ChatMessageEditButton } from './editButton';

interface ChatMessageProps {
  message: IMessage;
  showAvatar?: boolean;
}

export const ChatMessage: FC<ChatMessageProps> = ({ message, showAvatar }) => {
  const userId = useAppSelector(selectUserId);
  const companion = useAppSelector(selectOpenedChatCompanion);
  const dispatch = useAppDispatch();

  const [isHover, setIsHover] = useState(false);
  const [isPressing, setPressing] = useState(false);
  const timeout = useRef(null);

  const { text, sender, _id, conversationId } = message;
  const SHOW_MENU_DELAY = 500;
  const hasAvatar = Boolean(companion.avatar);
  const isUserMsg = userId === sender;
  const isTextMsg = typeof text === 'string';
  const isBgBlue = Boolean(isUserMsg && isTextMsg);

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

  const handleDeleteMessage = useCallback(() => {
    dispatch(deleteMessageThunk({ conversationId, messageId: _id }));
  }, [message]);

  const handleEditMessage = useCallback(() => {
    dispatch(setEditableMessage(message));
  }, [message]);

  return (
    <div
      className={twMerge(
        'w-10/12 md:w-10/12 xl:w-2/3 2xl:w-2/5 flex relative cursor-pointer ml-10',
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
        <div
          className={twMerge(
            'py-3 px-4  rounded-md flex break-all break-words justify-center items-center',
            isBgBlue ? 'bg-icon-active-color' : 'bg-bg',
          )}>
          <p className={twMerge(isBgBlue ? 'text-white' : '')}>{text}</p>
        </div>
        <div
          className={twMerge(
            'w-10 h-10 flex justify-center items-center absolute',
            isUserMsg ? '-left-11' : '-right-11',
          )}>
          {isUserMsg ? (
            <ChatMessageEditButton
              onDelete={handleDeleteMessage}
              onEdit={handleEditMessage}
              show={isHover}
              open={isPressing}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};
