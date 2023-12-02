import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';
import config from './config';
import { CONTACTS_TAG, PRIVATE_CHATS_TAG, SESSION_TAG } from './tags';

export const baseApi = createApi({
  /**
   * For jest testing
   * @note Jest did not exit one second after the test run has completed.
   */
  keepUnusedDataFor: config.isTest ? 0 : 60,

  baseQuery: baseQueryWithReauth,
  tagTypes: [SESSION_TAG, CONTACTS_TAG, PRIVATE_CHATS_TAG],
  reducerPath: 'api',
  endpoints: () => ({}),
});
