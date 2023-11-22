import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class InviteUserDto {
  @ApiProperty({ type: Types.ObjectId })
  @IsMongoId()
  invitedUserId: Types.ObjectId;
}
