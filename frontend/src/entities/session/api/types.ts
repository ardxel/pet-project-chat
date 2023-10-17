import { IUser } from 'shared/api/user';

export interface RegistrUserDto {
  token: string;
  user: IUser;
}
