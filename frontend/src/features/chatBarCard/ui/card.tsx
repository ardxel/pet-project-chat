import { selectChatLastMessage, selectOpenedChatData, selectOpenedChatId, setOpenedChatId } from 'entities/chats';
import { IMessage } from 'entities/message';
import { IUser, userUtils } from 'entities/session';
import { selectOpenChat, setOpenChat } from 'entities/ui-visibility';
import { ActionButtonGroup } from 'features/actionButtonGroup';
import { FC, memo, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { UserAvatar } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { useChatCompanionStatus, useLastMessageIntervalTime } from '../lib';

interface ChatBarCardProps {
  user: IUser;
  chatId: string;
}

const URL_REGEXP =
  /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})(\.[a-zA-Z0-9]{2,})?/;

export const ChatBarCard: FC<ChatBarCardProps> = memo(({ user, chatId }) => {
  const openedChatData = useAppSelector(selectOpenedChatData);
  const openedChatId = useAppSelector(selectOpenedChatId);
  const openChat = useAppSelector(selectOpenChat);
  const { status, isExistedInContacts } = useChatCompanionStatus(chatId);
  const lastMessage: IMessage | undefined = useAppSelector(selectChatLastMessage(chatId));

  const lastMessageCreatedAt = useLastMessageIntervalTime(chatId);

  const [hover, setHover] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpenChat = () => {
    if (openedChatId !== chatId) {
      dispatch(setOpenedChatId(chatId));
    }
    if (!openChat) {
      dispatch(setOpenChat(true));
    }
  };

  const LAST_MESSAGE_MAX_LENGTH = 23;
  const chatInArchive = openedChatData?.status === 'archived';
  const chatInTrash = openedChatData?.status === 'trash';

  const lastMessageText = useMemo(() => {
    if (!lastMessage || !lastMessage.text) return;

    if (URL_REGEXP.test(lastMessage.text)) return <em>ссылка</em>;

    if (lastMessage.text.length > LAST_MESSAGE_MAX_LENGTH) {
      return lastMessage.text.substring(0, LAST_MESSAGE_MAX_LENGTH - 3) + '...';
    } else {
      return lastMessage.text;
    }
  }, [lastMessage]);

  return (
    <div
      className={twMerge(
        'relative flex cursor-pointer items-center justify-between px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-900',
        openedChatId === chatId ? 'bg-gray-100 dark:bg-gray-900' : '',
      )}
      onClick={handleOpenChat}
      onMouseLeave={() => setHover(false)}
      onMouseEnter={() => setHover(true)}>
      <div className='flex gap-x-3'>
        <div className='relative h-[50px] w-[50px]'>
          <UserAvatar user={user} className='h-full w-full rounded-md' />
        </div>
        <div className='flex flex-col justify-center gap-y-[6px]'>
          <div className='flex items-center'>
            <div className='flex h-full items-center'>
              <h4 className='text-left text-sm'>{userUtils.getName(user)}</h4>
            </div>

            <div>
              <p className='ml-2 text-xs text-gray-400 dark:text-gray-500'>{status}</p>
            </div>
          </div>

          <div className='flex h-[15px] items-center text-sm'>
            {lastMessageText ? (
              <p className='m-0 text-sm leading-none'>
                {lastMessageText}
                <span className='mx-[6px] align-middle text-xl text-form-color '>•</span>
                <span className='m-0 align-middle text-xs text-form-color'>{lastMessageCreatedAt}</span>
              </p>
            ) : null}
          </div>
        </div>
      </div>
      <div>
        <ActionButtonGroup
          show={hover}
          targetUser={user}
          menuClassName={twMerge('w-[275px]')}
          options={{
            markAsRead: true,
            disableNotifications: { hr: !isExistedInContacts },
            viewProfile: isExistedInContacts ? { hr: true } : undefined,
            audioCall: true,
            videoCall: { hr: true },
            saveToArchive: chatInArchive ? undefined : true,
            restoreFromArchive: chatInArchive ? true : undefined,
            deleteChat: chatInTrash ? undefined : true,
            restoreFromTrash: chatInTrash ? true : undefined,
            report: true,
          }}
        />
      </div>
    </div>
  );
});
