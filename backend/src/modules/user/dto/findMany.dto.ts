import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

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
}
