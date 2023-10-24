import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { GenericDto } from 'common/interfaces';

export class RegisterUserDto implements GenericDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
  name: string;
}
