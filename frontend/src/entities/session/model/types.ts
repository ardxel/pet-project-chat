export interface Contact<Populated extends boolean> {
  user: Populated extends true ? IUser : string;
  status: 'common' | 'favorite' | 'blocked';
  createdAt: string;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  contacts: Contact<false>[];
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  gender?: string;
  language?: string[];
  country?: string;
  phoneNumber?: string;
  about?: string;
}
