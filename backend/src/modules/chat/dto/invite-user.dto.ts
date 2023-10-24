import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class InviteUserDto {
  @IsMongoId()
  invitedUserId: Types.ObjectId;
}
