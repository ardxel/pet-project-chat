import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class ChangeAvatarDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  userId: Types.ObjectId;
}
