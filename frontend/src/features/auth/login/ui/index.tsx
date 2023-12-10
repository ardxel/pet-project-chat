import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'shared/model';
import { Paths } from 'shared/routing';
import { Logo, PasswordInput } from 'shared/ui';
import { loginThunk } from '../model';
import { loginValidationSchema } from '../model/schema';

interface LoginFormProps {
  onSuccess: () => void;
}

const ErrMessage = ({ name }: { name: string }) => (
  <ErrorMessage
    component='p'
    name={name}
    className="mt-1 h-8 max-h-8 text-xs text-red-400 before:inline-block before:content-['*']"
  />
);

export const LoginForm: FC<LoginFormProps> = ({ onSuccess }) => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  return (
    <div className='main flex items-center justify-center overflow-hidden bg-aside-bg'>
      <div className='mx-4 w-full xs0:mx-auto xs0:w-auto xs0:min-w-[24rem]'>
        <div className='mx-auto flex items-center justify-center'>
          <Logo />
          <h1 className='text-xl'>ConnectMe</h1>
        </div>

        <div className='max-w-xl rounded-lg bg-bg'>
          <div className='px-6 py-8'>
            {error && <h1 className='mb-2 text-center text-xl text-red-500 first-letter:capitalize'>{error}</h1>}
            <h2 className='mb-3 text-left text-lg'>Войти в аккаунт</h2>
            <Formik
              enableReinitialize
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={loginValidationSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  await dispatch(loginThunk(values)).unwrap();
                  onSuccess();
                } catch (error) {
                  setError(error.message);
                  resetForm();
                }
              }}>
              {({ isSubmitting, dirty, isValid }) => (
                <Form>
                  <div className='flex flex-col gap-y-6 xs0:gap-x-6 xs0:gap-y-4'>
                    <div className='flex flex-col'>
                      <label htmlFor='email'>Почтовый адрес:</label>
                      <Field
                        className='form-input mt-3 duration-300 focus:border-blue-500'
                        name='email'
                        id='email'
                        type='text'
                        placeholder='вашапочта@почта.ру'
                      />
                      <ErrMessage name='email' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='password'>Пароль:</label>
                      <PasswordInput
                        className='mt-3 duration-300 focus:border-blue-500'
                        name='password'
                        id='password'
                        placeholder='пароль'
                      />
                      <ErrMessage name='password' />
                    </div>
                  </div>
                  <button
                    disabled={isSubmitting || (dirty && !isValid)}
                    type='submit'
                    className='mt-5 w-full rounded-md bg-btn-bg py-3 text-center font-bold text-white'>
                    Войти
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div>
          <p className='mt-5 text-center'>
            У вас нет аккаунта?{' '}
            <Link to={Paths.registration} className='text-active-link transition-colors hover:text-blue-700'>
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
