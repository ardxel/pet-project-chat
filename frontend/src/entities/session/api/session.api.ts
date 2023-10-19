import { baseApi, SESSION_TAG } from 'shared/api';
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
      transformResponse: (response: SessionUserDto) => response,
    }),
    register: build.mutation({
      query: (body: RequestRegisterBody) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body,
      }),
      invalidatesTags: [SESSION_TAG],
      transformResponse: (response: SessionUserDto) => response,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = sessionApi;
