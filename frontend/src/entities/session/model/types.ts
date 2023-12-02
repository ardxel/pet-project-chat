export interface Contact<Populated extends boolean> {
  user: Populated extends true ? IUser : string;
  status: 'common' | 'favorite' | 'blocked';
  createdAt: string;
}

export interface Chat<Populated extends boolean> {
  data: Populated extends true ? IUser : string;
  status: 'common' | 'archived' | 'spam' | 'trash';
}

export interface IUser<ContactPop extends boolean = false, ConversationPop extends boolean = false> {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  contacts: Contact<ContactPop>[];
  conversations: Chat<ConversationPop>[];
  firstName?: string;
  lastName?: string;
  birthday?: Date | string;
  gender?: string;
  language?: string[];
  country?: string;
  phoneNumber?: string;
  about?: string;
}
