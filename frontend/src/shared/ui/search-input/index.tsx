import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ChangeEvent, FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface SearchInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => unknown;
  className?: string;
  placeholder?: string;
}

export const SearchInput: FC<SearchInputProps> = ({ onChange, placeholder, className }) => {
  return (
    <div className={`relative w-auto h-10 `}>
      <input
        type='text'
        className={twMerge(
          'absolute w-full h-full py-3 pl-10 leading-4 rounded-full',
          'bg-icon-bg dark:bg-bg border-border border text-sm outline-none',
          'transition-all duration-[400]',
          'dark:focus:bg-gray-900 dark:focus:border-gray-900',
          'focus:bg-blue-100 focus:border-blue-100',
          className,
        )}
        placeholder={placeholder}
        onChange={onChange}
      />
      <SearchOutlinedIcon className='text-form-color !text-[20px] absolute top-1/2 transform -translate-y-1/2 left-3' />
    </div>
  );
};
