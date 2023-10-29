import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';
import { GenericDto } from 'common/interfaces';

export class RegisterUserDto implements GenericDto {
  @ApiProperty({ example: 'string' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'strongpassword' })
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'string' })
  @IsString()
  name: string;
}
