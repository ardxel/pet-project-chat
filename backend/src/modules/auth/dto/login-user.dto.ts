import { IsEmail, IsString } from 'class-validator';
import { GenericDto } from 'common/interfaces';

export class LoginUserDto implements GenericDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
