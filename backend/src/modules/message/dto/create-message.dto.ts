import { IsEnum, IsMongoId, IsOptional, IsString } from 'class-validator';
import { GenericDto } from 'common/interfaces';
import { Types } from 'mongoose';

export class CreateMessageDto implements GenericDto {
  @IsMongoId()
  sender: Types.ObjectId;

  @IsMongoId()
  conversationId: Types.ObjectId;

  @IsString()
  text: string;

  @IsEnum(['text', 'audio', 'video', 'call'])
  @IsOptional()
  type: 'text' | 'audio' | 'video' | 'call' = 'text';
}
