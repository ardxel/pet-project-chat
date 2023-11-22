import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { GenericDto } from 'common/interfaces';

export class RegisterUserDto implements GenericDto {
  @ApiProperty({ type: String, example: 'abcde@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: 'strongpassword' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ type: String, example: 'string' })
  @IsString()
  name: string;
}
