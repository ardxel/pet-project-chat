export interface SessionUserDto {
  token: string;
  user: UserDto;
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
  user: UserDto;
  isFavorite: boolean;
  createdAt: string;
}

export interface UserDto {
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
