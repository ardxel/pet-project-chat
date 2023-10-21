import { contactFilterOptions, search } from 'entities/contacts';
import { useAppDispatch } from 'shared/model';
import { HorizontalTabs, LeftBar } from 'shared/ui';
import { ContactList } from './contactList';
import { LeftbarHeader } from './head';
import { SearchBar } from './searchbar';

export const ContactsLeftbar = () => {
  const dispatch = useAppDispatch();

  return (
    <LeftBar>
      <LeftbarHeader />
      <div className='px-6 border-b border-border pb-2'>
        <HorizontalTabs
          // onSelect={(index) => dispatch(filterBy(index))}
          className='text-xs'
          items={contactFilterOptions}
        />
      </div>
      <SearchBar onChange={(e) => dispatch(search(e.target.value))} />
      <ContactList />
    </LeftBar>
  );
};
