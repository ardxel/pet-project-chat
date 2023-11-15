import { IMessage, selectOpenedChatCompanion, setEditableMessage } from 'entities/chats';
import { selectUserId } from 'entities/session';
import { deleteMessageThunk } from 'features/message/delete';
import moment from 'moment';
import { FC, useCallback, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { AvatarByFirstLetter } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { ChatMessageEditButton } from './editButton';

interface ChatMessageProps {
  message: IMessage;
  showAvatar?: boolean;
  isSelected: boolean;
}

export const ChatMessage: FC<ChatMessageProps> = ({ message, showAvatar, isSelected }) => {
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
  const showUpdatedTime = message.updatedAt !== message.createdAt;

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
        'flex w-full rounded-md',
        isUserMsg ? 'justify-end' : 'justify-start',
        isSelected ? 'border border-bg' : 'bg-inherit',
      )}>
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
                  <AvatarByFirstLetter
                    className='rounded-full [&>*]:!text-xl [&>*]:!leading-none [&>*]:-top-[11%] w-9 h-9'
                    name={companion.name}
                  />
                )}
              </div>
            )}
          </div>
          <div
            className={twMerge(
              'py-3 px-4 relative',
              'rounded-md flex break-all break-words justify-center items-center',
              isBgBlue ? 'bg-icon-active-color' : 'bg-bg',
            )}>
            {/* User Message */}
            <p className={twMerge(isBgBlue ? 'text-white' : '', showUpdatedTime ? 'mr-10' : 'mr-5', 'min-w-[15px]')}>
              {text}
            </p>
            {/* Message created or updated time */}
            <p
              className={twMerge(
                isBgBlue ? 'text-gray-100' : '',
                'text-[10px] absolute bottom-[2px] right-[4px] leading-3',
              )}>
              {showUpdatedTime
                ? 'ред. ' + moment(message.updatedAt).format('HH:mm')
                : moment(message.createdAt).format('HH:mm')}
            </p>
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
    </div>
  );
};
