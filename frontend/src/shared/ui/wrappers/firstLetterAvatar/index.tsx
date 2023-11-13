import { FC, memo, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

const getFirstLetter = (str: string) => {
  if (!str) return;
  for (const char of str) {
    if (/[A-Za-z]/.test(char)) {
      return char;
    }
  }
  return str[0];
};

interface AvatartByFirstLetterProps {
  name: string;
  className?: string;
}

export const AvatartByFirstLetter: FC<AvatartByFirstLetterProps> = memo(({ name, className }) => {
  const letter = useMemo(() => getFirstLetter(name), [name]);

  return (
    <div className={twMerge('relative border border-border w-full h-full rounded-md ', className)}>
      <h1 className='text-center text-2xl leading-none  absolute left-1/2 -transform translate-y-1/2 -translate-x-1/2'>
        {letter}
      </h1>
    </div>
  );
});
