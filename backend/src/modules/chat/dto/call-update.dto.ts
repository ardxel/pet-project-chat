import { IsBoolean, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CallUpdateDto {
  @IsMongoId()
  to: Types.ObjectId;

  @IsMongoId()
  from: Types.ObjectId;

  @IsBoolean()
  isVideoEnabled: boolean;

  @IsBoolean()
  isAudioEnabled: boolean;
}
