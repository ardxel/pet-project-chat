import { useEffect } from 'react';
import { CONTACTS_TAG, DataResponse, baseApi } from 'shared/api';
import { mapContacts } from '../lib/mapContacts';
import { ContactsDto } from './types';

export const contactsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getContacts: build.query({
      query: (userId: string) => ({
        url: `/user/${userId}/contacts`,
      }),
      providesTags: [CONTACTS_TAG],
      transformResponse: (response: DataResponse<ContactsDto>) => mapContacts(response),
    }),
  }),
});

// обычный useQuery не хочет работать
export const useGetContactsQuery = (userId: string) => {
  const [fetchContacts, result] = contactsApi.endpoints.getContacts.useLazyQuery();

  useEffect(() => {
    fetchContacts(userId);
  }, [userId]);

  return result;
};
