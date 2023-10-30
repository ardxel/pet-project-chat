import { FC, ReactNode } from 'react';

interface LeftBarProps {
  children?: ReactNode;
  className?: string;
}
//overflow-hidden h-[calc(100vh)]  md:h-[calc(100vh-70px)]
export const LeftBar: FC<LeftBarProps> = ({ children, className }) => {
  return (
    <aside className={'w-full flex-shrink-0 md:w-80 min-[1400px]:w-[360px] bg-bg border-r border-border ' + className}>
      {children}
    </aside>
  );
};
