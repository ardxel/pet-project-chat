import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMongoId, IsObject, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CallAnswerDto {
  @ApiProperty({ type: Types.ObjectId })
  @IsMongoId()
  to: Types.ObjectId;

  @ApiProperty({ enum: ['accept', 'cancel'] })
  @IsEnum(['accept', 'cancel'])
  verdict: 'accept' | 'cancel';

  @ApiProperty({ example: 'signal data', type: Object, required: false })
  @IsObject()
  @IsOptional()
  signal: Record<string, any>;
}
