import { ChangeEvent, FC } from 'react';
import { SearchInput } from 'shared/ui';

interface SearchBarProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => unknown;
  className?: string;
}

export const SearchBar: FC<SearchBarProps> = ({ onChange, className }) => {
  return (
    <div className={'px-5 mb-4 ' + className}>
      <SearchInput onChange={onChange} placeholder='Найти контакт / чат' />
    </div>
  );
};
