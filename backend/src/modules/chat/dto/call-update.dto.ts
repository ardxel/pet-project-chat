import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId } from 'class-validator';
import { Types } from 'mongoose';

export class CallUpdateDto {
  @ApiProperty({ type: Types.ObjectId })
  @IsMongoId()
  to: Types.ObjectId;

  @ApiProperty({ type: Types.ObjectId })
  @IsMongoId()
  from: Types.ObjectId;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isVideoEnabled: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isAudioEnabled: boolean;
}
