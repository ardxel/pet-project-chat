import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class AddContactDto {
  @IsMongoId()
  initiatorId: Types.ObjectId;

  @IsMongoId()
  addedId: Types.ObjectId;

  @IsBoolean()
  @IsOptional()
  returnUserAfter?: boolean;
}
