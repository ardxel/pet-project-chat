import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class DeleteMessageDto {
  @ApiProperty({ type: String, example: 'Message ID' })
  @IsMongoId()
  messageId: Types.ObjectId;

  @ApiProperty({ type: String, example: 'Conversation ID' })
  @IsMongoId()
  conversationId: Types.ObjectId;
}
