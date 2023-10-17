import { IUser } from 'shared/api/user';

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
