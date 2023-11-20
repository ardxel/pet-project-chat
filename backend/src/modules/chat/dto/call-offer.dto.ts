import { IsBoolean, IsMongoId, IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CallOfferDto {
  @IsMongoId()
  to: Types.ObjectId;

  @IsMongoId()
  from: Types.ObjectId;

  @IsObject()
  signal: Record<string, any>;

  @IsString()
  name: string;

  @IsBoolean()
  isVideoCall: boolean;
}
