import { selectChatLastMessage } from 'entities/chats';
import { IMessage } from 'entities/message';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'shared/model';
import { MessageTimeFormatter } from './lastMessageTime';

const format = MessageTimeFormatter.getRelativeTime;

export const useLastMessageIntervalTime = (chatId: string, updateMs?: number) => {
  const lastMessage: IMessage | undefined = useAppSelector(selectChatLastMessage(chatId));
  const [currentTime, setCurrentTime] = useState(format(lastMessage));

  useEffect(() => {
    if (!lastMessage) return;
    setCurrentTime(format(lastMessage));
    const MINUTE_IN_MS = 60000;
    /**
     * Изменение времени создания последнего сообщения с интервалом в 1 минуту
     */
    const intervalId = setInterval(() => {
      setCurrentTime(format(lastMessage));
    }, updateMs || MINUTE_IN_MS);

    return clearInterval(intervalId);
  }, [lastMessage]);

  return currentTime || '';
};
