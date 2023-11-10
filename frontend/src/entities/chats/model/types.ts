import { IUser } from 'entities/session';

export interface IMessage {
  conversationId: string;
  sender: string;
  _id: string;
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

export type PrivateChatsMap = Record<
  string,
  {
    companion: IUser;
    messages: IMessage[];

    isAllMessagesFetched: boolean;
    page: number;
    lastScrollPoint: number;
  }
>;

export type PublicChatsMap = Record<
  string,
  {
    companions: IUser[];
    messages: IMessage[];
    isFull: boolean;
    page: number;
    limit: number;
    lastScrollPoint: number;
  }
>;
