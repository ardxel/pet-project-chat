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

export type ConversationStatus = 'common' | 'archived' | 'spam' | 'trash';

export type PrivateChatsMap = Record<
  string,
  {
    companion: IUser;
    messages: IMessage[];
    companionStatus: 'online' | 'offline' | 'typing';
    status: ConversationStatus;
    isCompanionActive: boolean;
    isAllMessagesFetched: boolean;
    page: number;
    isLoading: boolean;
  }
>;

export type PublicChatsMap = Record<
  string,
  {
    companions: IUser[];
    messages: IMessage[];
    status: ConversationStatus;
    isAllMessagesFetched: boolean;
    page: number;
    lastScrollPoint: number;
  }
>;
