import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { userConversationStatus } from 'schemas';

export class ChangeConversationStatusDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  userId: Types.ObjectId;

  @ApiProperty({ type: String })
  @IsMongoId()
  conversationId: Types.ObjectId;

  @ApiProperty({ enum: userConversationStatus })
  @IsEnum(userConversationStatus)
  status: (typeof userConversationStatus)[number];
}
