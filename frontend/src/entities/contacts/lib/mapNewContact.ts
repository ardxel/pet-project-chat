import { Contact, IUser } from 'entities/session';
import { DataResponse } from 'shared/api';

export const mapNewContact = (response: DataResponse<{ user?: IUser; new_contact: Contact<true> }>) => {
  return response.payload;
};
