import { IMessage } from 'entities/chats';
import { ChatMessage } from 'entities/message';
import { selectUserId } from 'entities/session';
import moment from 'moment';
import { FC, Fragment, memo } from 'react';
import { useAppSelector } from 'shared/model';

interface MessageListProps {
  messages: IMessage[];
}
export const MessageList: FC<MessageListProps> = memo(({ messages }) => {
  const userId = useAppSelector(selectUserId);

  if (!messages) return null;

  return (
    <>
      {/* Этот div нужен для того чтобы сообщения отображались внизу окна, а не сверху. */}
      {/* При применении flex-col-reverse ломается последовательность сообщений, а при justify-end пропадает скроллбар. */}
      <div className='flex flex-auto'></div>
      {messages.map((msg, index) => {
        const isNotUserSender = msg.sender !== userId;
        const nextMsgByUser = !messages[index + 1] || (messages[index + 1] && messages[index + 1].sender === userId);
        const showAvatar = isNotUserSender && nextMsgByUser;

        /**
         * Лучше использовать createdAt, если использовать updatedAt, то над сообщением
         * будет появляться новая дата, хотя сообщения старые и под этим сообщением могут быть новые сообщения с другой датой,
         * и эта дата будет перекрывать нижние значения, допустим сообщение сверху
         * было опубликовано (отредактировано) 13.10.2000 а сообщения снизу 12.10.2000, что может дезориентировать
         * пользователя.
         *
         * @todo
         * Лучше добавить в компоненте сообщения фичу о том
         * когда в последний раз было отредактировано это сообщение
         *
         */

        const currentMsgDate = moment(msg.createdAt);
        const isSameDay = messages[index - 1] && currentMsgDate.isSame(messages[index - 1].createdAt, 'day');

        return (
          <Fragment key={index}>
            {!isSameDay ? (
              <div className='w-full my-4 mx-auto'>
                <p className='text-center text-xs'>{currentMsgDate.format('MMM DD, YYYY, hh:mm A')}</p>
              </div>
            ) : null}
            <ChatMessage showAvatar={showAvatar} message={msg} />
          </Fragment>
        );
      })}
    </>
  );
});
