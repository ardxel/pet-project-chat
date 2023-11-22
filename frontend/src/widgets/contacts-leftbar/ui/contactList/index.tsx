import { selectFilteredContacts, useGetContactsQuery } from 'entities/contacts';
import { ContactBarCard } from 'features/contactbarCard';
import { FC } from 'react';
import { useAppSelector } from 'shared/model';

interface ContactListProps {}

export const ContactList: FC<ContactListProps> = () => {
  const contacts = useAppSelector(selectFilteredContacts);

  useGetContactsQuery();

  if (!contacts) return null;

  return (
    <div className='flex flex-col'>
      {contacts.map((user, i) => {
        return <ContactBarCard key={i} data={user} />;
      })}
    </div>
  );
};
