import { IUser } from 'entities/session';
import queryString from 'query-string';
import { DataResponse, PRIVATE_CHATS_TAG, baseApi } from 'shared/api';
import { mapUsers } from '../lib/mapUsers';

interface SearchUsersByNameParams {
  limit?: number;
  page?: number;
  name: string;
}

export const chatsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchUsersByName: build.query({
      query: (params: SearchUsersByNameParams) => ({
        url: `/user?${queryString.stringify(params)}`,
      }),
      providesTags: [PRIVATE_CHATS_TAG],
      transformResponse: (response: DataResponse<IUser[]>) => mapUsers(response),
    }),
  }),
});

export const { useLazySearchUsersByNameQuery } = chatsApi;
