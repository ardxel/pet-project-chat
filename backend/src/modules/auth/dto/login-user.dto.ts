import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { GenericDto } from 'common/interfaces';

export class LoginUserDto implements GenericDto {
  @ApiProperty({ type: String, example: 'abcde@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: 'strongpassword' })
  @IsString()
  password: string;
}
