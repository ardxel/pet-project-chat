import { ContactListItem, selectFilteredContacts, useGetContactsQuery } from 'entities/contacts';
import { selectUserId } from 'entities/session';
import { FC } from 'react';
import { useAppSelector } from 'shared/model';

interface ContactListProps {}

export const ContactList: FC<ContactListProps> = () => {
  const userId = useAppSelector(selectUserId);
  const contacts = useAppSelector(selectFilteredContacts);

  useGetContactsQuery(userId);

  if (!contacts) return null;

  return (
    <div className='flex flex-col'>
      {contacts.map((user, i) => {
        return <ContactListItem key={i} data={user} />;
      })}
    </div>
  );
};
