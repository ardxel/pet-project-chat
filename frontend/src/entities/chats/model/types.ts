import { IUser } from 'entities/session';

export interface IMessage {
  conversationId: string;
  sender: string;
  text: string;
  updatedAt: Date;
  createdAt: Date;
}

export interface IConversation {
  users: IUser[];
  messages: IMessage[];
  _id: string;
}
