import { SearchInput } from 'shared/ui';

export const SearchBar = () => {
  return (
    <div className='px-5 mb-4'>
      <SearchInput placeholder='Найти контакт / чат' />
    </div>
  );
};
