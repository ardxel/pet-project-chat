import { ApiProperty } from '@nestjs/swagger';

export class ResponseData {
  @ApiProperty({ enum: ['success', 'fail', 'error'] })
  status: string;

  @ApiProperty({ type: String, required: false })
  message?: string;

  @ApiProperty({ type: String, required: false, description: 'Error stack' })
  stack?: any;
}
