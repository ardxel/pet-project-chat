import { FC, memo, useMemo } from 'react';
import { twMerge } from 'tailwind-merge';

interface AvatartByFirstLetterProps {
  name: string;
  className?: string;
}

export const AvatartByFirstLetter: FC<AvatartByFirstLetterProps> = memo(({ name, className }) => {
  const letter = useMemo(() => {
    if (!name) return;
    for (let i = 0; i < name.length; i++) {
      if (/[A-Za-z]/.test(name[i])) {
        return name[i];
      }
    }
    return name[0];
  }, [name]);

  return (
    <div className={twMerge('relative border border-border w-full h-full rounded-md ', className)}>
      <h1 className='text-center text-2xl leading-none  absolute left-1/2 -transform translate-y-1/2 -translate-x-1/2'>
        {letter}
      </h1>
    </div>
  );
});
