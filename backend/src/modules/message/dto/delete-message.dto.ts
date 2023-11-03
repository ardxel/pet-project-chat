import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class DeleteMessageDto {
  @IsMongoId()
  messageId: Types.ObjectId;

  @IsMongoId()
  conversationId: Types.ObjectId;
}
