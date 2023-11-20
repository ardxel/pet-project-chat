import { IsEnum, IsMongoId, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CallEndDto {
  @IsMongoId()
  to: Types.ObjectId;

  @IsMongoId()
  from: Types.ObjectId;

  @IsMongoId()
  caller: Types.ObjectId;

  @IsNumber()
  seconds: number;

  @IsEnum(['outgoing', 'missed'])
  reason: 'outgoing' | 'missed' = 'missed';

  @IsEnum(['video', 'audio'])
  type: 'video' | 'audio';
}
