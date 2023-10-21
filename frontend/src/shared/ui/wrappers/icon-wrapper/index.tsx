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
        '[&>*]:hover:text-icon-active-color [&>*]:transition-all hover:bg-icon-active-bg',
        'flex justify-center items-center [&>svg]:w-full [&>svg]:h-full text-icon-color bg-icon-bg p-3 rounded-full transition-all',
        focus ? '[&>*]:text-icon-active-color bg-icon-active-bg' : '',
        className,
      )}>
      {children}
    </div>
  );
};
