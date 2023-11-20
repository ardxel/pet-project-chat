import { IMessage } from 'entities/message';
import { IUser } from 'entities/session';

export interface IConversation {
  users: IUser[];
  messages: IMessage[];
  isPrivate: boolean;
  _id: string;
}

export type ConversationStatus = 'common' | 'archived' | 'spam' | 'trash';
export type CompanionStatus = 'online' | 'offline' | 'typing';

export type PrivateChatsMap = Record<
  string,
  | {
      companion: IUser;
      messages: IMessage[];
      companionStatus: CompanionStatus;
      status: ConversationStatus;
      isAllMessagesFetched: boolean;
      page: number;
      isLoading: boolean;
    }
  | undefined
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
