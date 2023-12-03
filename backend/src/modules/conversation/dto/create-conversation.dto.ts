import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsMongoId } from 'class-validator';
import { GenericDto } from 'common/interfaces';
import { Types } from 'mongoose';

export class CreateConversationDto implements GenericDto {
  @ApiProperty({ type: [String], example: ['id1', 'id2'] })
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  userIds: Types.ObjectId[];
}
