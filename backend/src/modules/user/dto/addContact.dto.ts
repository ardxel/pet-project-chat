import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class AddContactDto {
  @ApiProperty({ type: String })
  @IsMongoId()
  initiatorId: Types.ObjectId;

  @ApiProperty({ type: String })
  @IsMongoId()
  addedId: Types.ObjectId;

  @ApiProperty({ type: Boolean, required: false })
  @IsBoolean()
  @IsOptional()
  returnUserAfter?: boolean;
}
