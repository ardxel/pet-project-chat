import { contactFilterOptions, filterBy, search } from 'entities/contacts';
import { selectOpenContactPage } from 'entities/ui-visibility';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { HorizontalTabs, LeftBar } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { ContactList } from './contactList';
import { LeftBarHeader } from './head';
import { SearchBar } from './searchbar';

const ContactsLeftBar = () => {
  const openContactPage = useAppSelector(selectOpenContactPage);
  const dispatch = useAppDispatch();

  return (
    <LeftBar
      className={twMerge(`${!openContactPage ? 'flex' : 'hidden'}`, 'relative flex-col  overflow-hidden md:flex')}>
      <LeftBarHeader />
      <div className='border-b border-border px-6 pb-2'>
        <HorizontalTabs
          onSelect={(index) => dispatch(filterBy(index))}
          className='text-xs'
          items={contactFilterOptions}
        />
      </div>
      <SearchBar onChange={(e) => dispatch(search(e.target.value))} />
      <ContactList />
    </LeftBar>
  );
};

export default ContactsLeftBar;
