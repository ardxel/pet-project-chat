import { selectOpenedChatMessages } from 'entities/chats';
import { ChatMessage } from 'entities/message';
import { selectUserId } from 'entities/session';
import moment from 'moment';
import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { useAppSelector } from 'shared/model';
import { SearchMessageBar } from './searchMessage';

interface MessageListProps {}

export const MessageList: FC<MessageListProps> = () => {
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null);
  // const selectedMessageIndex = useAppSelector(selectSelectedMessageIndex);

  const messages = useAppSelector(selectOpenedChatMessages);
  const userId = useAppSelector(selectUserId);
  const msgRef = useRef<HTMLDivElement>(null);

  const selectIndex = (index: number) => {
    setSelectedMessageIndex(index);
  };

  /**
   * При активном поиске или при изменении отображаемого индекса сообщения
   * происходит прокрутка до этого самого сообщения
   */
  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedMessageIndex]);

  if (!messages || !messages.length) return null;

  return (
    <>
      <SearchMessageBar onSelectIndex={selectIndex} />
      {/* Этот div нужен для того чтобы сообщения отображались внизу окна, а не сверху. */}
      {/* При применении flex-col-reverse ломается последовательность сообщений, а при justify-end пропадает скроллбар. */}
      <div className='flex flex-auto'></div>
      {messages.map((msg, index) => {
        const isSelectedIndex = index === selectedMessageIndex;
        const isNotUserSender = msg.sender !== userId;
        const nextMsgByUser = !messages[index + 1] || (messages[index + 1] && messages[index + 1].sender === userId);
        const showAvatar = isNotUserSender && nextMsgByUser;

        /**
         * Лучше использовать createdAt, если использовать updatedAt, то над сообщением
         * будет появляться новая дата, хотя сообщения старые и под этим сообщением могут быть новые сообщения с другой датой,
         * и эта дата будет перекрывать нижние значения, допустим сообщение сверху
         * было опубликовано (отредактировано) 13.10.2000 а сообщения снизу 12.10.2000, что может дезориентировать
         * пользователя.
         */
        const currentMsgDate = moment(msg.createdAt);
        const prevMessageCreatedAtTheSameDay =
          messages[index - 1] && currentMsgDate.isSame(messages[index - 1].createdAt, 'day');

        return (
          <Fragment key={index}>
            <div ref={isSelectedIndex ? msgRef : undefined} />
            {!prevMessageCreatedAtTheSameDay ? (
              <div className='mx-auto my-4 w-full'>
                <p className='text-center text-xs'>{currentMsgDate.format('MMM DD, YYYY, hh:mm A')}</p>
              </div>
            ) : null}
            <ChatMessage showAvatar={showAvatar} message={msg} isSelected={isSelectedIndex} />
          </Fragment>
        );
      })}
    </>
  );
};
