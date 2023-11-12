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
    className="text-xs mt-1 h-8 max-h-8 before:content-['*'] text-red-400 before:inline-block"
  />
);

export const LoginForm: FC<LoginFormProps> = ({ onSuccess }) => {
  const [error, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  return (
    <div className='bg-aside-bg main flex justify-center items-center overflow-hidden'>
      <div className='w-full mx-4 xs0:mx-auto xs0:w-auto'>
        <div className='flex items-center justify-center mx-auto'>
          <Logo />
          <h1 className='text-xl'>ConnectMe</h1>
        </div>

        <div className='max-w-xl bg-bg rounded-lg'>
          <div className='px-6 py-8'>
            {error && <h1 className='text-xl text-center first-letter:capitalize text-red-500 mb-2'>{error}</h1>}
            <h2 className='text-left text-lg mb-3'>Войти в аккаунт</h2>
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
              {({ isSubmitting }) => (
                <Form>
                  <div className='flex flex-col gap-y-6 xs0:gap-x-6 xs0:gap-y-4'>
                    <div className='flex flex-col'>
                      <label htmlFor='email'>Почтовый адрес:</label>
                      <Field
                        className='form-input mt-3'
                        name='email'
                        id='email'
                        type='text'
                        placeholder='вашапочта@почта.ру'
                      />
                      <ErrMessage name='email' />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='password'>Пароль:</label>
                      <PasswordInput className='mt-3' name='password' id='password' placeholder='пароль' />
                      <ErrMessage name='password' />
                    </div>
                  </div>
                  <button
                    disabled={isSubmitting}
                    type='submit'
                    className='w-full text-center text-whie rounded-md mt-5 font-bold py-3 bg-btn-bg'>
                    Войти
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div>
          <p className='text-center mt-5'>
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
