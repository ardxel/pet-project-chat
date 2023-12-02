import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class ChangeAvatarDto {
  avatar: File;

  @IsMongoId()
  userId: Types.ObjectId;
}
