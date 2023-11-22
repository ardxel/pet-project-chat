import { IUser } from 'entities/session';
import { DataResponse } from 'shared/api';

export const mapDeletedContactId = (response: DataResponse<{ user?: IUser; deletedId: string }>) => {
  return response.payload;
};
