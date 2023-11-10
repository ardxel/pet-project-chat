import { ApiProperty } from '@nestjs/swagger';
import { User } from 'schemas';
import { ResponseData } from './response.schema';

class AuthPayload {
  @ApiProperty({ type: User })
  user: User;

  @ApiProperty({ type: String })
  token: string;
}

export class AuthResponseData extends ResponseData {
  @ApiProperty({ type: AuthPayload })
  payload: AuthPayload;
}
