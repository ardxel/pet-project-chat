import { DataResponse } from 'shared/api';

export const successDataResponse = <T>(payload: T): DataResponse<T> => ({
  status: 'success',
  payload,
  message: 'Hello world',
});
