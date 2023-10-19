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

export interface UserDto {
  _id: string;
  email: string;
  name: string;
  // TODO
  avatar?: string;
  contacts: UserDto[];
  fullname?: string;
  birthday?: Date;
  gender?: string;
  language?: string[];
  hometown?: string;
  phoneNumber?: string;
  about?: string;
}
