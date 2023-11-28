import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useField } from 'formik';
import { FC, InputHTMLAttributes, useState } from 'react';

/**
 * Удалил type атрибут из интерфейса чтобы нельзя было прокинуть этот пропс в input
 * и не нарушить работу компонента.
 */
interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {}

/**
 * Данный компонент работает только внутри formik провайдера.
 */

export const PasswordInput: FC<PasswordInputProps> = ({ className, ...rest }) => {
  const [field] = useField({ name: rest.name });
  const [show, setShow] = useState(false);
  return (
    <div className={'relative ' + (className || '')}>
      <input
        {...field}
        {...rest}
        type={show ? 'text' : 'password'}
        className='h-full w-full rounded-md border border-border  bg-bg px-4 py-3 text-sm leading-4 outline-none duration-300 focus:border-blue-500'
      />
      <button
        onClick={() => setShow(!show)}
        type='button'
        className='absolute right-3 top-1/2 z-30 -translate-y-1/2 transform'>
        {show ? <RemoveRedEyeOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
      </button>
    </div>
  );
};
