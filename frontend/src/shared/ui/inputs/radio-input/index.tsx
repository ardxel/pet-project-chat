import { FC, InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface RadioInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

export const RadioInput: FC<RadioInputProps> = ({ className, ...rest }) => {
  return <input {...rest} type='radio' className={twMerge('form-check-input w-4 h-4 rounded-full', className)} />;
};
