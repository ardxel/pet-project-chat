import { FC, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface IconWrapperProps {
  children: ReactNode;
  className?: string;
  focus?: boolean;
}

export const IconWrapper: FC<IconWrapperProps> = ({ children, className, focus = false }) => {
  return (
    <div
      className={twMerge(
        'hover:bg-icon-active-bg [&>*]:transition-all [&>*]:hover:text-icon-active-color',
        'flex items-center justify-center rounded-full bg-icon-bg p-3 text-icon-color transition-all [&>svg]:h-full [&>svg]:w-full',
        focus ? 'bg-icon-active-bg [&>*]:text-icon-active-color' : '',
        className,
      )}>
      {children}
    </div>
  );
};
