import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface LeftBarProps {
  children?: ReactNode;
  className?: string;
}

export const LeftBar: FC<LeftBarProps> = ({ children, className }) => {
  return (
    <aside
      className={twMerge(
        'h-full w-full flex-shrink-0 border-r border-border bg-bg 1400:!w-[360px] md:w-80 ' + className,
      )}>
      {children}
    </aside>
  );
};
