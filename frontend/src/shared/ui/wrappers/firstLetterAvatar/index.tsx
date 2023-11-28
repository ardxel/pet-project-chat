import { memo } from 'react';
import { twMerge } from 'tailwind-merge';

const getFirstLetter = (str: string) => {
  if (!str) return;
  for (const char of str) {
    if (/[A-Za-z]/.test(char)) {
      return char.toUpperCase();
    }
  }
  return str[0].toUpperCase();
};

interface AvatarByFirstLetterProps {
  name: string;
  className?: string;
}

export const AvatarByFirstLetter: React.FC<AvatarByFirstLetterProps> = memo(({ name, className }) => {
  const letter = getFirstLetter(name);

  return (
    <div className={twMerge('flex h-10 w-10 items-center justify-center rounded-md border border-border', className)}>
      <h1 className='text-center text-2xl leading-none'>{letter}</h1>
    </div>
  );
});
