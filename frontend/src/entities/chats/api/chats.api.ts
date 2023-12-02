import { Chat, IUser } from 'entities/session';
import queryString from 'query-string';
import { DataResponse, PRIVATE_CHATS_TAG, baseApi } from 'shared/api';
import { mapUsers } from '../lib/mapUsers';

export interface ResponseChangeChatStatusBody {
  userId: string;
  conversationId: string;
  status: Chat<false>['status'];
}

export interface SearchUsersByParams {
  limit?: number;
  page?: number;
  name?: string;
  ids?: string[];
}

export const chatsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchUsers: build.query<IUser[], SearchUsersByParams>({
      query: (params: SearchUsersByParams) => ({
        url: `/user?${queryString.stringify(params, { arrayFormat: 'comma' })}`,
      }),
      providesTags: [PRIVATE_CHATS_TAG],
      transformResponse: (response: DataResponse<IUser[]>) => mapUsers(response),
    }),
    changeChatStatus: build.mutation({
      query: (body: ResponseChangeChatStatusBody) => ({
        url: '/user/conversation/status',
        method: 'POST',
        body,
      }),
      invalidatesTags: [PRIVATE_CHATS_TAG],
      transformResponse: (_, __, args) => args,
    }),
  }),
});

export const { useLazySearchUsersQuery, useChangeChatStatusMutation } = chatsApi;
