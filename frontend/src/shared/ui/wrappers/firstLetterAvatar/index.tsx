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
    <div className={twMerge('flex items-center justify-center border border-border w-10 h-10 rounded-md', className)}>
      <h1 className='text-center text-2xl leading-none'>{letter}</h1>
    </div>
  );
});
