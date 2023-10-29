import { ErrorMessage, Field, Form, Formik } from 'formik';
import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from 'shared/model';
import { Paths } from 'shared/routing';
import { Logo, PasswordInput } from 'shared/ui';
import { registerThunk } from '../model';
import { validationRegisterSchema } from '../model/schema';

// full password regex =
// ^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!-_.]){8,}$

interface RegisterFormProps {
  onSuccess: () => void;
}

const ErrMessage = ({ name }: { name: string }) => (
  <ErrorMessage
    component='p'
    name={name}
    className="text-xs mt-1 h-8 max-h-8 before:content-['*'] before:inline-block"
  />
);

export const RegisterForm: FC<RegisterFormProps> = ({ onSuccess }) => {
  const [error, setError] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  return (
    <div className='bg-aside-bg main flex justify-center items-center'>
      <div className='w-full xs0:mx-auto xs0:w-auto'>
        <div className='flex items-center justify-center mx-auto'>
          <Logo />
          <h1 className='text-xl'>ConnectMe</h1>
        </div>

        <div className='max-w-xl bg-bg rounded-lg'>
          <div className='px-6 py-8'>
            {error && <h1 className='text-xl text-center first-letter:capitalize text-red-500 mb-2'>{error}</h1>}
            <h2 className='text-left text-lg mb-3'>Создать аккаунт</h2>
            <Formik
              enableReinitialize
              initialValues={{
                agree: false,
                name: '',
                email: '',
                password: '',
                repeatPassword: '',
              }}
              validationSchema={validationRegisterSchema}
              onSubmit={async ({ email, name, password }, { resetForm }) => {
                try {
                  await dispatch(registerThunk({ email, name, password })).unwrap();
                  onSuccess();
                } catch (error) {
                  setError((error as Error).message);
                  resetForm();
                }
              }}>
              {({ isSubmitting }) => (
                <Form>
                  <div className='grid grid-cols-1 xs0:grid-cols-2 lg:grid-cols-2 gap-y-6 xs0:gap-x-6 xs0:gap-y-4'>
                    <div className='flex flex-col'>
                      <label htmlFor='name'>Имя:</label>
                      <Field className='form-input mt-3' name='name' id='name' type='text' placeholder='ваше имя' />
                      <ErrMessage name='name' />
                    </div>
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
                    <div className='flex flex-col'>
                      <label htmlFor='repeatPassword'>Повторите пароль:</label>
                      <PasswordInput
                        className=' mt-3'
                        name='repeatPassword'
                        id='repeatPassword'
                        placeholder='пароль снова'
                      />
                      <ErrMessage name='repeatPassword' />
                    </div>
                  </div>
                  <div className='mt-4'>
                    <label className={'w-full inline-block'}>
                      <Field type='checkbox' name='agree' className='mr-2 w-4 h-4' />
                      {'Я согласен с политикой конфиденциальности и условиями'}
                      <ErrMessage name='agree' />
                    </label>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type='submit'
                    className='w-full text-center text-white rounded-md mt-3 font-bold py-3 bg-btn-bg'>
                    {isSubmitting ? 'Идет загрузка...' : 'Зарегистрироваться'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div>
          <p className='text-center mt-5'>
            У вас уже есть аккаунт?{' '}
            <Link to={Paths.login} className='text-active-link transition-colors hover:text-blue-700'>
              Войти
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
