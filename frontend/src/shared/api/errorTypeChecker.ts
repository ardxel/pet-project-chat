import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { DataResponse } from './types';

export function isRegisteredError(error: unknown): error is FetchBaseQueryError & { data: DataResponse<never> } {
  return isFetchBaseQueryError(error) && errorHasBaseDataResponse(error.data);
}

export function errorHasBaseDataResponse(errorData: unknown): errorData is DataResponse<never> {
  return typeof errorData === 'object' && errorData !== null && 'status' in errorData && 'message' in errorData;
}

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}
