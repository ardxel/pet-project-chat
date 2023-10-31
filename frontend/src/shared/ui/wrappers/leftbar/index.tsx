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
        'w-full h-full flex-shrink-0 md:w-80 1400:!w-[360px] bg-bg border-r border-border ' + className,
      )}>
      {children}
    </aside>
  );
};
