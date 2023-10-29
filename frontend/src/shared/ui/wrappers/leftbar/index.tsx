import { FC, ReactNode } from 'react';

interface LeftBarProps {
  children?: ReactNode;
  className?: string;
}

export const LeftBar: FC<LeftBarProps> = ({ children, className }) => {
  return (
    <aside
      className={
        'w-full flex-shrink-0 md:w-80 min-[1400px]:w-[360px] bg-bg h-full border-r border-border ' + className
      }>
      {children}
    </aside>
  );
};
