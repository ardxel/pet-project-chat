import { createApi } from '@reduxjs/toolkit/query/react';
import { appBaseQuery } from './baseQuery';
import { CONTACTS_TAG, PRIVATE_CHATS_TAG, SESSION_TAG } from './tags';

export const baseApi = createApi({
  baseQuery: appBaseQuery,
  tagTypes: [SESSION_TAG, CONTACTS_TAG, PRIVATE_CHATS_TAG],
  reducerPath: 'api',
  endpoints: () => ({}),
});
