import { IUser } from 'entities/session';
import { logoutThunk } from 'features/auth/logout';
import {
  ChatClientErrorEvents,
  ChatEvents,
  IConversation,
  IMessage,
  addConversation,
  addMessage,
  addMessages,
  setUserId,
} from '../model';

interface MessagesDTO {
  messages: IMessage[];
  conversationId: string;
}

interface MessageDTO {
  message: IMessage;
  conversationId: string;
}

export const createCallbackHandlers = (dispatch: AppDispatch) => ({
  [ChatEvents.USER_INIT]: (data: IUser) => dispatch(setUserId(data._id)),
  [ChatEvents.CONVERSATION_CREATE]: (data: IConversation) => dispatch(addConversation(data)),
  [ChatEvents.CONVERSATION_FETCH]: (data: IConversation[]) => dispatch(addConversation(data)),
  [ChatEvents.MESSAGE_CREATE]: (data: MessageDTO) => dispatch(addMessage(data)),
  [ChatEvents.MESSAGE_FETCH]: (data: MessagesDTO) => dispatch(addMessages(data)),
  [ChatClientErrorEvents.INVALID_TOKEN]: () => dispatch(logoutThunk()),
});
