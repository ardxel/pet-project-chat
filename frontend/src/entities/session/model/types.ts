export interface SessionUserDto {
  token: string;
  user: IUser;
}

export interface RequestRegisterBody {
  email: string;
  name: string;
  password: string;
}

export interface RequestLoginBody {
  email: string;
  password: string;
}

export interface Contact {
  user: IUser;
  isFavorite: boolean;
  createdAt: string;
}

export interface IUser {
  _id: string;
  email: string;
  name: string;
  // TODO
  avatar?: string;
  contacts: Contact[];
  firstName?: string;
  lastName?: string;
  birthday?: Date;
  gender?: string;
  language?: string[];
  hometown?: string;
  phoneNumber?: string;
  about?: string;
}
