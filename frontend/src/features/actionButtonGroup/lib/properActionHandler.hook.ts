import { useCallsContext } from 'entities/calls';
import { IUser, userUtils } from 'entities/session';
import { useCallback } from 'react';
import { ActionKey } from '../ui';
import { useChatActions } from './chatActions.hook';
import { useContactActions } from './contactActions.hook';

type FirstArgType<T> = T extends (...args: infer P) => any ? P[0] : never;

/**
 * @param {IUser | string} user объект пользователя либо его id
 * @returns {(key: ActionKey) => Promise<any> | any} функция, которая принимает actionKey, с помощью
 * которого выбирается нужный метод для взаимодействия с пользователем.
 * @note Должно быть строгое соответствие названия ключа c уже  имеющимися actionItems
 *
 * @example
 * // инициализируем хук в компоненте. Передаем объект пользователя или его id (лучше первое).
 * // На выходе получаем callback функцию.
 * const actionHandler = useProperActionHandler(user)
 * // Допустим мы хотим сделать ивент отправки сообщения.
 * // Передаем аргумент нужного ивент ключа, в данном случае это 'sendMessage'
 * <button onClick={() => actionHandler('sendMessage')}>Отправить сообщение</button>
 * // При клике на button теперь будет срабатывать ивент отправки сообщения конкретному пользователю.
 */
export const useProperActionHandler = (user: IUser | string) => {
  const { sendMessage, changeChatStatus } = useChatActions(user);
  const { openContactProfile, deleteContact } = useContactActions(user);
  const { callUser } = useCallsContext();

  const selectProperHandler: (key: ActionKey) => Promise<any> | any = useCallback(
    (key: ActionKey) => {
      switch (key) {
        case 'audioCall':
          return callUser.bind(null, {
            isVideoCall: false,
            receiverName: userUtils.getName(user),
            userId: userUtils.getUserId(user),
          } as FirstArgType<typeof callUser>);

        case 'videoCall':
          return callUser.bind(null, {
            isVideoCall: true,
            receiverName: userUtils.getName(user),
            userId: userUtils.getUserId(user),
          } as FirstArgType<typeof callUser>);

        case 'sendMessage':
          return sendMessage;

        case 'viewProfile':
          return openContactProfile;

        case 'restoreFromArchive':
        case 'restoreFromTrash':
          return changeChatStatus.bind(null, 'common' as FirstArgType<typeof changeChatStatus>);

        case 'saveToArchive':
          return changeChatStatus.bind(null, 'archived' as FirstArgType<typeof changeChatStatus>);

        case 'deleteChat':
          return changeChatStatus.bind(null, 'trash' as FirstArgType<typeof changeChatStatus>);

        case 'deleteContact':
          return deleteContact;
        default:
          return () => console.warn('empty handler');
      }
    },
    [user],
  );

  return selectProperHandler;
};
