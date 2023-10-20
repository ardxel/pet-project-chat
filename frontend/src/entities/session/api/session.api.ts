import { baseApi, DataResponse, SESSION_TAG } from 'shared/api';
import { mapSession } from '../lib/mapSession';
import { RequestLoginBody, RequestRegisterBody, SessionUserDto } from './types';

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body: RequestLoginBody) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body,
      }),
      invalidatesTags: [SESSION_TAG],
      transformResponse: (response: DataResponse<SessionUserDto>) => mapSession(response),
    }),
    register: build.mutation({
      query: (body: RequestRegisterBody) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body,
      }),
      invalidatesTags: [SESSION_TAG],
      transformResponse: (response: DataResponse<SessionUserDto>) => mapSession(response),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = sessionApi;
