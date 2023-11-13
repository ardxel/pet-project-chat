import {
  IMessage,
  selectChatLastMessage,
  selectCompanionStatusByChatId,
  selectIsHiddenChat,
  selectOpenedChatId,
  setIsHiddenChat,
  setOpenedChatId,
} from 'entities/chats';
import { IUser } from 'entities/session';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { UserAvatar } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { MessageTimeFormatter } from '../lib/lastMessageTime';
import { MenuButton } from './listButton';

interface ChatbarCardProps {
  user?: Partial<IUser>;
  conversationId: string;
}

const format = MessageTimeFormatter.getRelativeTime;

export const ChatbarCard: FC<ChatbarCardProps> = memo(({ user, conversationId }) => {
  const openedChatId = useAppSelector(selectOpenedChatId);
  const isHiddenChat = useAppSelector(selectIsHiddenChat);
  const lastMessage: IMessage | undefined = useAppSelector(selectChatLastMessage(conversationId));
  const chatCompanionStatus = useAppSelector(selectCompanionStatusByChatId(conversationId));

  const [hover, setHover] = useState(false);
  const [currentTime, setCurrentTime] = useState(format(lastMessage));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!lastMessage) return;
    setCurrentTime(format(lastMessage));
    const MINUTE_IN_MS = 60000;
    /**
     * Изменение времени создания последнего сообщения с интервалом в 1 минуту
     */
    const intervalId = setInterval(() => {
      setCurrentTime(format(lastMessage));
    }, MINUTE_IN_MS);

    return () => {
      clearInterval(intervalId);
    };
  }, [lastMessage]);

  const handleOpenChat = () => {
    if (openedChatId !== conversationId) {
      dispatch(setOpenedChatId(conversationId));
    }
    if (isHiddenChat) {
      dispatch(setIsHiddenChat(false));
    }
  };

  const LAST_MESSAGE_MAX_LENGTH = 25;
  const hasFullname = Boolean(user.firstName && user.lastName);

  const lastMessageText = useMemo(() => {
    if (!lastMessage || !lastMessage.text) return;
    if (lastMessage.text.length > LAST_MESSAGE_MAX_LENGTH) {
      return lastMessage.text.substring(0, LAST_MESSAGE_MAX_LENGTH - 3) + '...';
    } else {
      return lastMessage.text;
    }
  }, [lastMessage]);

  const companionStatus = useMemo(() => {
    switch (chatCompanionStatus) {
      case 'online':
        return chatCompanionStatus;
      case 'offline':
        break;
      case 'typing':
        return chatCompanionStatus + ' ...';
      default:
        return;
    }
  }, [chatCompanionStatus]);

  return (
    <div
      className={twMerge(
        'flex items-center justify-between cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 px-4 py-3 relative',
        openedChatId === conversationId ? 'bg-gray-100 dark:bg-gray-900' : '',
      )}
      onClick={handleOpenChat}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}>
      <div className='flex gap-x-3'>
        <div className='relative w-[50px] h-[50px]'>
          <UserAvatar user={user} />
        </div>
        <div className='flex flex-col justify-center gap-y-[6px]'>
          <div className='flex items-center'>
            <div className='flex items-center h-full'>
              <h4 className='text-left text-sm'>{hasFullname ? user.firstName + ' ' + user.lastName : user.name}</h4>
            </div>

            <div>
              <p className='text-xs text-gray-400 dark:text-gray-500 ml-2'>{companionStatus}</p>
            </div>
          </div>

          <div className='flex items-center text-sm h-[15px]'>
            {lastMessageText ? (
              <p className='text-sm leading-none m-0'>
                {lastMessageText}
                <span className='align-middle text-xl mx-[6px] text-form-color '>•</span>
                <span className='text-xs align-middle text-form-color m-0'>{currentTime || ''}</span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div>
        <MenuButton show={hover} />
      </div>
    </div>
  );
});
