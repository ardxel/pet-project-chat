import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class GetMessagesDto {
  @ApiPropertyOptional({ type: Number, example: 1 })
  @IsNumber()
  @IsOptional()
  page?: number;

  @ApiProperty({ type: String, example: 'Conversation ID' })
  @IsMongoId()
  conversationId: Types.ObjectId;
}
