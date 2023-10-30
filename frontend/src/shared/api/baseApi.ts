import { createApi } from '@reduxjs/toolkit/query/react';
import { appBaseQuery } from './baseQuery';
import { CHATS_TAG, CONTACTS_TAG, SESSION_TAG } from './tags';

export const baseApi = createApi({
  baseQuery: appBaseQuery,
  tagTypes: [SESSION_TAG, CONTACTS_TAG, CHATS_TAG],
  reducerPath: 'api',
  endpoints: () => ({}),
});
