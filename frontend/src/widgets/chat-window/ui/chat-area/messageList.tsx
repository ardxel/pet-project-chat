import { IMessage } from 'entities/chats';
import { selectUserId } from 'entities/session';
import { ChatMessage } from 'features/message';
import { FC } from 'react';
import { useAppSelector } from 'shared/model';

interface MessageListProps {
  messages: IMessage[];
}
export const MessageList: FC<MessageListProps> = ({ messages }) => {
  const userId = useAppSelector(selectUserId);

  if (!messages) return null;
  return (
    <>
      {messages.map((msg, index) => {
        const isNotUserSender = msg.sender !== userId;
        const nextMsgByUser = messages[index + 1] && messages[index + 1].sender === userId;
        const showAvatar = isNotUserSender && nextMsgByUser;
        return <ChatMessage showAvatar={showAvatar} key={index} message={msg} />;
      })}
    </>
  );
};
