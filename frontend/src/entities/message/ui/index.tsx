import { selectOpenedChatCompanion, setEditableMessage } from 'entities/chats';
import { selectUserId } from 'entities/session';
import { deleteMessageThunk } from 'features/message/delete';
import { FC, useCallback, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { twMerge } from 'tailwind-merge';
import { IMessage } from '../model';
import { CompanionAvatar } from './companionAvatar';
import { ChatMessageEditButton } from './editButton';
import { MessageTime } from './messageTime';
import { MessageValue } from './messageValue';

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
  const isUserMsg = userId === sender;
  const isTextMsg = !message.type || message.type === 'text';
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
          <div className='absolute -left-11 bottom-0'>{showAvatar && <CompanionAvatar companion={companion} />}</div>
          <div
            className={twMerge(
              'relative',
              'rounded-md flex break-all break-words justify-center items-center',
              isBgBlue ? 'bg-icon-active-color' : 'bg-bg',
            )}>
            {/* User Message */}
            <MessageValue message={message} />
            {/* Message created or updated time */}
            <MessageTime message={message} />
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
