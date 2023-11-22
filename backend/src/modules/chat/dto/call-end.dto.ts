import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsNumber } from 'class-validator';
import { Types } from 'mongoose';

export class CallEndDto {
  @ApiProperty({ type: Types.ObjectId })
  @IsMongoId()
  to: Types.ObjectId;

  @ApiProperty({ type: Types.ObjectId })
  @IsMongoId()
  from: Types.ObjectId;

  @ApiProperty({ type: Types.ObjectId })
  @IsMongoId()
  caller: Types.ObjectId;

  @ApiProperty({ type: Number })
  @IsNumber()
  seconds: number;

  @ApiProperty({ enum: ['outgoing', 'missed'] })
  @IsEnum(['outgoing', 'missed'])
  reason: 'outgoing' | 'missed' = 'missed';

  @ApiProperty({ enum: ['video', 'audio'] })
  @IsEnum(['video', 'audio'])
  type: 'video' | 'audio';
}
