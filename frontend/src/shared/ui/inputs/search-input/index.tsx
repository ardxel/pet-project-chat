import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ChangeEvent, FC, memo } from 'react';
import { twMerge } from 'tailwind-merge';

interface SearchInputProps {
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  wrapperClassName?: string;
  placeholder?: string;
  value?: string;
}

export const SearchInput: FC<SearchInputProps> = memo(
  ({ onChange, placeholder, wrapperClassName, className, value }) => {
    return (
      <div className={twMerge('relative h-10 w-auto', wrapperClassName)}>
        <input
          type='text'
          className={twMerge(
            'h-full w-full rounded-full py-3 pl-10 leading-4',
            'border border-border bg-icon-bg text-sm outline-none dark:bg-bg',
            'transition-all duration-[400]',
            'dark:focus:border-gray-900 dark:focus:bg-gray-900',
            'focus:border-blue-100 focus:bg-blue-100',
            className,
          )}
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <SearchOutlinedIcon className='absolute left-3 top-1/2 -translate-y-1/2 transform !text-[20px] text-form-color' />
      </div>
    );
  },
);
