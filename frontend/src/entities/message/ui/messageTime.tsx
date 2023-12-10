import { selectUserId } from 'entities/session';
import moment from 'moment';
import { FC, memo } from 'react';
import { useAppSelector } from 'shared/model';
import { twMerge } from 'tailwind-merge';
import { messageUtils } from '../lib';
import { IMessage } from '../model';

interface MessageTimeProps {
  message: IMessage;
}

export const MessageTime: FC<MessageTimeProps> = memo(({ message }) => {
  const userId = useAppSelector(selectUserId);
  const showUpdatedTime = messageUtils.showUpdatedTime(message);
  const isUserMsg = messageUtils.isMine(message, userId);
  const isTextMsg = messageUtils.getType(message) === 'text';
  return (
    <p
      className={twMerge(
        isUserMsg && isTextMsg ? 'text-gray-100' : '',
        'absolute bottom-[2px] right-[4px] text-[10px] leading-3',
      )}>
      {showUpdatedTime
        ? 'ред. ' + moment(message.updatedAt).format('HH:mm')
        : moment(message.createdAt).format('HH:mm')}
    </p>
  );
});
