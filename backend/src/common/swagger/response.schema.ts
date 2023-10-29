import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { User } from 'schemas';

export const responseData = (Data: any) => {
  class SwaggerResponseData {
    @ApiProperty()
    status: string;

    @ApiProperty({ type: () => Data })
    payload: any;

    @ApiProperty()
    @IsOptional()
    message: string;
  }
  return SwaggerResponseData;
};

export const responseAuthData = () => {
  class AuthResponsePayloadData {
    @ApiProperty({ type: () => User })
    user: User;

    @ApiProperty({ type: () => String })
    token: string;
  }

  return responseData(AuthResponsePayloadData);
};
