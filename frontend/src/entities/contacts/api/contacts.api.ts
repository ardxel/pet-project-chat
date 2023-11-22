import { Contact, IUser, selectUserId } from 'entities/session';
import { useEffect } from 'react';
import { CONTACTS_TAG, DataResponse, baseApi } from 'shared/api';
import { useAppSelector } from 'shared/model';
import { mapContacts } from '../lib/mapContacts';
import { mapDeletedContactId } from '../lib/mapDeletedContact';
import { mapNewContact } from '../lib/mapNewContact';
import { selectContactsIsExists } from '../model';
import { ContactsDto } from './types';

export interface AddContactDto {
  initiatorId: string;
  addedId: string;
  returnUserAfter?: boolean;
}

export interface DeleteContactDto {
  initiatorId: string;
  deletedId: string;
  returnUserAfter?: boolean;
}

export const contactsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getContacts: build.query({
      query: (userId: string) => ({
        url: `/user/contacts/${userId}`,
      }),
      providesTags: [CONTACTS_TAG],
      transformResponse: (response: DataResponse<ContactsDto>) => mapContacts(response),
    }),

    addContact: build.mutation({
      query: (body: AddContactDto) => ({
        url: '/user/contacts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [CONTACTS_TAG],
      transformResponse: (response: DataResponse<{ user?: IUser; new_contact: Contact }>) => mapNewContact(response),
    }),
    deleteContact: build.mutation({
      query: (body: DeleteContactDto) => ({
        url: '/user/contacts',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: [CONTACTS_TAG],
      transformResponse: (response: DataResponse<{ user?: IUser; deletedId: string }>) => mapDeletedContactId(response),
    }),
  }),
});

// обычный useQuery не хочет работать
export const useGetContactsQuery = () => {
  const userId = useAppSelector(selectUserId);
  const contactsIsExists = useAppSelector(selectContactsIsExists);
  const [fetchContacts, result] = contactsApi.endpoints.getContacts.useLazyQuery();

  useEffect(() => {
    if (!contactsIsExists) {
      fetchContacts(userId);
    }
  }, [userId]);

  return result;
};
