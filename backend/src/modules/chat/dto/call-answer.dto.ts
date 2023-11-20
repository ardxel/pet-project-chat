import { IsEnum, IsMongoId, IsObject, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CallAnswerDto {
  @IsMongoId()
  to: Types.ObjectId;

  @IsEnum(['accept', 'cancel'])
  verdict: 'accept' | 'cancel';

  @IsObject()
  @IsOptional()
  signal: Record<string, any>;
}
