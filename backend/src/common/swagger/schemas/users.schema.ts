import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
import { User } from 'schemas';
import { ResponseData } from './response.schema';

class PayloadManyUsers {
  @ApiProperty({ type: [User] })
  users: User[];
}

export class ResponseDataManyUsers extends ResponseData {
  @ApiProperty({ type: PayloadManyUsers })
  payload: PayloadManyUsers;
}

class PayloadUserWithNewContact {
  @ApiProperty({ type: User, required: false })
  user: User;

  @ApiProperty({ type: User })
  new_contact: User;
}

export class ResponseDataNewContact extends ResponseData {
  @ApiProperty({ type: PayloadUserWithNewContact })
  payload: PayloadUserWithNewContact;
}

class PayloadUserWithDeletedContact {
  @ApiProperty({ type: User, required: false })
  user: User;

  @ApiProperty({ type: String })
  deletedId: Types.ObjectId;
}

export class ResponseDataDeletedContact extends ResponseData {
  @ApiProperty({ type: PayloadUserWithDeletedContact })
  payload: PayloadUserWithDeletedContact;
}

export class ResponseDataUpdatedUser extends ResponseData {
  @ApiProperty({ type: User })
  payload: User;
}
