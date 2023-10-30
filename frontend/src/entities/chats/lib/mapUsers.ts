import { IUser } from 'entities/session';
import { DataResponse } from 'shared/api';

export const mapUsers = (response: DataResponse<IUser[]>) => response.payload;
