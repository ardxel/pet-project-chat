import { IsMongoId, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateMessageDto {
  @IsMongoId()
  messageId: Types.ObjectId;

  @IsMongoId()
  conversationId: Types.ObjectId;

  @IsString()
  text: string;
}
