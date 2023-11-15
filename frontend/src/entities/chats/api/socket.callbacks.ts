import { IUser } from 'entities/session';
import { logoutThunk } from 'features/auth/logout';
import {
  ChatClientErrorEvents,
  ChatEvents,
  CompanionStatus,
  ConversationStatus,
  IConversation,
  IMessage,
  addConversation,
  addConversationList,
  addMessage,
  addMessageList,
  deleteMessage,
  setUserId,
  updateCompanionStatus,
  updateMessage,
} from '../model';

type ConversationListDTO = Array<{ data: IConversation; status: ConversationStatus }>;

interface MessagesDTO {
  messages: IMessage[];
  conversationId: string;
}

interface MessageDTO {
  message: IMessage;
  conversationId: string;
}

interface DeleteMessageDTO {
  messageId: string;
  conversationId: string;
}

export interface UpdateCompanionStatusDto {
  userId: string;
  conversationId: string;
  status: CompanionStatus;
}

export const createCallbackHandlers = (dispatch: AppDispatch) => ({
  [ChatClientErrorEvents.INVALID_TOKEN]: () => dispatch(logoutThunk()),

  [ChatEvents.USER_INIT]: (data: IUser) => dispatch(setUserId(data._id)),
  [ChatEvents.USER_STATUS]: (data: UpdateCompanionStatusDto) => dispatch(updateCompanionStatus(data)),
  [ChatEvents.CONVERSATION_CREATE]: (data: IConversation) => dispatch(addConversation(data)),
  [ChatEvents.CONVERSATION_FETCH]: (data: ConversationListDTO) => dispatch(addConversationList(data)),
  [ChatEvents.MESSAGE_CREATE]: (data: MessageDTO) => dispatch(addMessage(data)),
  [ChatEvents.MESSAGE_UPDATE]: (data: IMessage) => dispatch(updateMessage(data)),
  [ChatEvents.MESSAGE_FETCH]: (data: MessagesDTO) => dispatch(addMessageList(data)),
  [ChatEvents.MESSAGE_DELETE]: (data: DeleteMessageDTO) => dispatch(deleteMessage(data)),
});
