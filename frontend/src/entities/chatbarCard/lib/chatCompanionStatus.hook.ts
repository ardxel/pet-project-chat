import { selectCompanionStatusByChatId, selectOpenedChatCompanionStatus } from 'entities/chats';
import { useMemo } from 'react';
import { useAppSelector } from 'shared/model';

export const useChatCompanionStatus = (chatId?: string) => {
  const companionStatusByChatId = useAppSelector(selectCompanionStatusByChatId(chatId), {
    stabilityCheck: chatId ? 'always' : 'never',
  });
  const companionStatusByOpenedChat = useAppSelector(selectOpenedChatCompanionStatus, {
    stabilityCheck: chatId ? 'never' : 'always',
  });

  const companionStatus = useMemo(() => {
    const status = companionStatusByChatId || companionStatusByOpenedChat;
    if (!status) return;

    switch (status) {
      case 'online':
        return status;
      case 'offline':
        break;
      case 'typing':
        return status + ' ...';
      default:
        return;
    }
  }, [companionStatusByChatId, companionStatusByOpenedChat]);

  return companionStatus;
};