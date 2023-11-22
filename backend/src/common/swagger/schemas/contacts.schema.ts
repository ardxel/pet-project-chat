import { ApiProperty } from '@nestjs/swagger';
import { User } from 'schemas';
import { ResponseData } from './response.schema';

class Contacts {
  @ApiProperty({ type: User })
  user: User;

  @ApiProperty({ enum: ['common', 'favorite', 'blocked'] })
  status: 'common' | 'favorite' | 'blocked';

  @ApiProperty({ type: Date })
  createdAt: Date;
}

class ContactsPayload {
  @ApiProperty({ isArray: true, type: Contacts })
  contacts: User['contacts'];
}

export class ContactsResponseData extends ResponseData {
  @ApiProperty({ type: ContactsPayload })
  payload: User['contacts'];
}
