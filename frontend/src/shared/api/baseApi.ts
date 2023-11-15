import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import { CONTACTS_TAG, PRIVATE_CHATS_TAG, SESSION_TAG } from './tags';

export const baseApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [SESSION_TAG, CONTACTS_TAG, PRIVATE_CHATS_TAG],
  reducerPath: 'api',
  endpoints: () => ({}),
});
