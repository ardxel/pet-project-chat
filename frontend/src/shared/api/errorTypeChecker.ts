import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { DataResponse } from './types';

interface FailDataResponse extends DataResponse<never> {
  status: 'fail';
}

export function isRegisteredError(error: unknown): error is FetchBaseQueryError & { data: FailDataResponse } {
  return isFetchBaseQueryError(error) && errorHasDataResponse(error.data) && error.data.status === 'fail';
}

export function errorHasDataResponse(errorData: unknown): errorData is FailDataResponse {
  return typeof errorData === 'object' && errorData !== null && 'status' in errorData && 'message' in errorData;
}

export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error != null && 'status' in error;
}
