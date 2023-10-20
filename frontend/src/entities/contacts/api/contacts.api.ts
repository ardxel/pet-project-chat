import { baseApi } from 'shared/api';

export const contactsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getContacts: build.query({
      query: (userId: string) => ({
        url: `/user/${userId}/contacts`,
        method: 'GET',
      }),
      transformResponse: (response) => console.log(response),
    }),
  }),
});
