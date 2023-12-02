import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class FindManyQueryDto {
  @ApiProperty({ type: String, required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  limit?: number;

  @ApiProperty({ type: Number, required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  page?: number;

  @ApiProperty({ type: [Types.ObjectId], required: false })
  @Type(({ object, property }) => {
    if (Types.ObjectId.isValid(object[property])) return String;
    return String;
  })
  @Transform((param) => {
    if (Types.ObjectId.isValid(param.value)) return param.value.toString().split(',');
    return param.value.split(',');
  })
  @IsOptional()
  ids?: Types.ObjectId[];
}
