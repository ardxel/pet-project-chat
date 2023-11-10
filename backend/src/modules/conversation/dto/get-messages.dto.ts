import { IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class GetMessagesDto {
  @IsNumber()
  @IsOptional()
  page?: number;

  @IsMongoId()
  conversationId: Types.ObjectId;
}
