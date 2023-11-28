import { baseApi, DataResponse, SESSION_TAG } from 'shared/api';
import { mapSession, mapUpdatedUser } from '../lib';
import { IUser, RequestLoginBody, RequestRegisterBody, SessionUserDto } from '../model';

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
    update: build.mutation({
      query: (body: Pick<IUser, '_id'> & Partial<IUser>) => ({
        url: '/user',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [SESSION_TAG],
      transformResponse: (response: DataResponse<IUser>) => mapUpdatedUser(response),
    }),
    changePassword: build.mutation({
      query: (body: Pick<IUser, '_id'> & { oldPassword: string; newPassword: string }) => ({
        url: '/user/password',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [SESSION_TAG],
      transformResponse: (response: DataResponse<IUser>) => mapUpdatedUser(response),
    }),
  }),
});
