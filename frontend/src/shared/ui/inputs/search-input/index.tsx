import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ChangeEvent, FC } from 'react';
import { twMerge } from 'tailwind-merge';

interface SearchInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  wrapperClassName?: string;
  placeholder?: string;
  value?: string;
}

export const SearchInput: FC<SearchInputProps> = ({ onChange, placeholder, wrapperClassName, className, value }) => {
  return (
    <div className={twMerge('relative w-auto h-10', wrapperClassName)}>
      <input
        type='text'
        className={twMerge(
          'w-full h-full py-3 pl-10 leading-4 rounded-full',
          'bg-icon-bg dark:bg-bg border-border border text-sm outline-none',
          'transition-all duration-[400]',
          'dark:focus:bg-gray-900 dark:focus:border-gray-900',
          'focus:bg-blue-100 focus:border-blue-100',
          className,
        )}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <SearchOutlinedIcon className='text-form-color !text-[20px] absolute top-1/2 transform -translate-y-1/2 left-3' />
    </div>
  );
};
