import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsObject, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CallOfferDto {
  @ApiProperty({ type: Types.ObjectId })
  @IsMongoId()
  to: Types.ObjectId;

  @ApiProperty({ type: Types.ObjectId })
  @IsMongoId()
  from: Types.ObjectId;

  @ApiProperty({ type: Object, example: 'signal data' })
  @IsObject()
  signal: Record<string, any>;

  @ApiProperty({ type: String })
  @IsString()
  name: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isVideoCall: boolean;
}
