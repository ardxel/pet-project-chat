import { ChangeEvent } from 'react';
import { SearchInput } from 'shared/ui';

export const SearchBar = ({ onChange }: { onChange: (e: ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <div className='mb-4 mt-6 px-5'>
      <SearchInput onChange={onChange} placeholder='Найти контакт / чат' />
    </div>
  );
};
