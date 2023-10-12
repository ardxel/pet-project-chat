import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useField } from 'formik';
import { FC, InputHTMLAttributes, useState } from 'react';
interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const PasswordInput: FC<PasswordInputProps> = ({ className, ...rest }) => {
  const [field] = useField({ name: rest.name });
  const [show, setShow] = useState(false);
  return (
    <div className={'relative ' + className}>
      <input
        {...field}
        {...rest}
        type={show ? 'text' : 'password'}
        className='bg-bg border-border border w-full h-full text-sm outline-none px-4 py-3 leading-4 rounded-md'
      />
      <button
        onClick={() => setShow(!show)}
        type='button'
        className='absolute z-30 right-3 top-1/2 transform -translate-y-1/2'>
        {show ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
      </button>
    </div>
  );
};
