import { ChangeEvent, FC } from 'react';
import { SearchInput } from 'shared/ui';

interface SearchBarProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => unknown;
}

export const SearchBar: FC<SearchBarProps> = ({ onChange }) => {
  return (
    <div className='px-5 mb-4'>
      <SearchInput onChange={onChange} placeholder='Найти контакт / чат' />
    </div>
  );
};
