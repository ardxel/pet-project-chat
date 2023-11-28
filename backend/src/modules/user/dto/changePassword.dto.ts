import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsStrongPassword } from 'class-validator';
import { Types } from 'mongoose';

export class ChangePasswordDto {
  @ApiProperty({ type: Types.ObjectId })
  @IsMongoId()
  _id: Types.ObjectId;

  @ApiProperty({ type: String, example: 'strongpassword' })
  @IsStrongPassword()
  oldPassword: string;

  @ApiProperty({ type: String, example: 'strongpassword' })
  @IsStrongPassword()
  newPassword: string;
}
