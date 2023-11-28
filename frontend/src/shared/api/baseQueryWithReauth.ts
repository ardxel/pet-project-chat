import { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/dist/query';
import { appBaseQuery } from './baseQuery';
import { invalidateAccessToken } from './invalidateTokenEvent';

const AUTH_ERROR_CODES = new Set([401]);
const IGNORE_PATHS = ['user/password'];

export const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions) => {
  const result = await appBaseQuery(args, api, extraOptions);
  const errorStatusCode = result.error?.status as number;

  const hasIgnoredRequest = IGNORE_PATHS.some((path) => result.meta.request.url.includes(path));

  if (AUTH_ERROR_CODES.has(errorStatusCode) && !hasIgnoredRequest) {
    api.dispatch(invalidateAccessToken());
  }

  return result;
};
