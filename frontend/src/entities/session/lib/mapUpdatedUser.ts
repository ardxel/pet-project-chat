import { DataResponse } from 'shared/api';
import { IUser } from '../model';

export const mapUpdatedUser = function (response: DataResponse<IUser>) {
  return response.payload;
};
