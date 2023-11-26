import { Contact } from 'entities/session';
import { DataResponse } from 'shared/api';
import { ContactsDto } from '../api/types';

export const mapContacts = (dto: DataResponse<ContactsDto>): Contact<true>[] => {
  return dto.payload.contacts;
};
