import { IMessage } from 'entities/chats';
import { ChatMessage } from 'entities/message';
import { selectUserId } from 'entities/session';
import moment from 'moment';
import { FC, Fragment, memo, useEffect, useRef } from 'react';
import { useAppSelector } from 'shared/model';

interface MessageListProps {
  messages: IMessage[];
  selectedIndex: number;
}
export const MessageList: FC<MessageListProps> = memo(({ messages, selectedIndex }) => {
  const userId = useAppSelector(selectUserId);
  const msgRef = useRef<HTMLDivElement>(null);
  if (!messages) return null;

  useEffect(() => {
    if (msgRef.current) {
      msgRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedIndex]);

  return (
    <>
      {/* Этот div нужен для того чтобы сообщения отображались внизу окна, а не сверху. */}
      {/* При применении flex-col-reverse ломается последовательность сообщений, а при justify-end пропадает скроллбар. */}
      <div className='flex flex-auto'></div>
      {messages.map((msg, index) => {
        const isSelectedIndex = index === selectedIndex;
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
              <div className='w-full my-4 mx-auto'>
                <p className='text-center text-xs'>{currentMsgDate.format('MMM DD, YYYY, hh:mm A')}</p>
              </div>
            ) : null}
            <ChatMessage showAvatar={showAvatar} message={msg} isSelected={isSelectedIndex} />
          </Fragment>
        );
      })}
    </>
  );
});
