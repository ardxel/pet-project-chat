import { IsEnum, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { UserStatus } from 'schemas';

export class ChangeUserStatusDto {
  @IsMongoId()
  userId: Types.ObjectId;

  @IsMongoId()
  conversationId: Types.ObjectId;

  @IsEnum(['offline', 'online', 'typing'])
  status: UserStatus;
}
