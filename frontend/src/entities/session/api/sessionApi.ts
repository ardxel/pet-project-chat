import { baseApi, SESSION_TAG } from 'shared/api';

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body,
      }),
      invalidatesTags: [SESSION_TAG],
      transformResponse: (response) => response,
    }),
    register: build.mutation({
      query: (body) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body,
      }),
      invalidatesTags: [SESSION_TAG],
      transformResponse: (response) => response,
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = sessionApi;
