import { ArrayMinSize, IsMongoId } from 'class-validator';
import { GenericDto } from 'common/interfaces';
import { Types } from 'mongoose';

export class CreateConversationDto implements GenericDto {
  @IsMongoId({ each: true })
  @ArrayMinSize(1)
  userIds: Types.ObjectId[];
}
