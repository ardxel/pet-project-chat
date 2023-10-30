import { IUser } from 'entities/session';

export interface IMessage {
  conversationId: string;
  sender: string;
  text: string;
  updatedAt: string;
  createdAt: string;
}

export interface IConversation {
  users: IUser[];
  messages: IMessage[];
  isPrivate: boolean;
  _id: string;
}
