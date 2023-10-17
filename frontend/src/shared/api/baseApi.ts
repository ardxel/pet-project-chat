import { createApi } from '@reduxjs/toolkit/query/react';
import { appBaseQuery } from './baseQuery';
import { SESSION_TAG } from './tags';

export const baseApi = createApi({
  baseQuery: appBaseQuery,
  tagTypes: [SESSION_TAG],
  reducerPath: 'api',
  endpoints: () => ({}),
});
