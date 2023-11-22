import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class DeleteContactDto {
  @ApiProperty({ type: Types.ObjectId })
  @IsMongoId()
  initiatorId: Types.ObjectId;

  @ApiProperty({ type: Types.ObjectId })
  @IsMongoId()
  deletedId: Types.ObjectId;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  returnUserAfter?: boolean;
}
