import { selectChatIdByCompanionId, setOpenedChatId } from 'entities/chats';
import { IUser, userUtils } from 'entities/session';
import { createPrivateChat } from 'features/chat/create/model';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { Paths } from 'shared/routing';

/**
 * @param {IUser | string} targetUser объект пользователя или его id
 * @returns функции для взаимодействия с чатом target пользователя.
 */
export const useChatActions = (targetUser: IUser | string) => {
  const userId = userUtils.getUserId(targetUser);

  const chatId = useAppSelector(selectChatIdByCompanionId(userId));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const remotelyOpenChat = () => {
    if (chatId) {
      dispatch(setOpenedChatId(chatId));
    }
  };

  const sendMessage = async () => {
    if (!chatId) {
      await dispatch(createPrivateChat(userUtils.getUserId(targetUser))).unwrap();
    }

    remotelyOpenChat();
    navigate(Paths.chat, { replace: true });
  };

  return {
    sendMessage,
  };
};
