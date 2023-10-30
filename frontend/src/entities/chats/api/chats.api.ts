import { IUser } from 'entities/session';
import queryString from 'query-string';
import { CHATS_TAG, DataResponse, baseApi } from 'shared/api';
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
      providesTags: [CHATS_TAG],
      transformResponse: (response: DataResponse<IUser[]>) => mapUsers(response),
    }),
  }),
});

export const { useLazySearchUsersByNameQuery } = chatsApi;
