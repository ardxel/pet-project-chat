import { FC, ReactNode } from 'react';

interface LeftBarProps {
  children: ReactNode;
}

export const LeftBar: FC<LeftBarProps> = ({ children }) => {
  return <aside className='w-full md:w-80 bg-bg h-full border-r border-border'>{children}</aside>;
};
