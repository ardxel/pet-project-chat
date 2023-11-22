import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';
import { UserStatus } from 'schemas';

export class ChangeUserStatusDto {
  @ApiProperty({ type: Types.ObjectId })
  @IsMongoId()
  userId: Types.ObjectId;

  @ApiProperty({ type: Types.ObjectId })
  @IsMongoId()
  conversationId: Types.ObjectId;

  @ApiProperty({ enum: ['offline', 'online', 'typing'] })
  @IsEnum(['offline', 'online', 'typing'])
  status: UserStatus;
}
