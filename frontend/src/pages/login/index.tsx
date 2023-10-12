import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { Paths } from 'shared/routing';
import { Logo, PasswordInput } from 'shared/ui';
import * as yup from 'yup';

export const LoginForm = () => {
  return (
    <div className='bg-aside-bg main flex justify-center items-center'>
      <div className='w-full mx-4 xs0:mx-auto xs0:w-auto'>
        <div className='flex items-center justify-center mx-auto'>
          <Logo />
          <h1 className='text-xl'>ConnectMe</h1>
        </div>

        <div className='max-w-xl bg-bg rounded-lg'>
          <div className='px-6 py-8'>
            <h2 className='text-left text-lg mb-3'>Войти в аккаунт</h2>
            <Formik
              enableReinitialize
              initialValues={{
                email: '',
                password: '',
              }}
              validationSchema={yup.object().shape({
                email: yup
                  .string()
                  .email('Неправильная форма почтового адреса.')
                  .required('почтовый адрес является обязательным.'),
                password: yup
                  .string()
                  .min(6, 'Минимальная длина пароля 6 символов.')
                  .required('Пожалуйста, введите пароль'),
              })}
              onSubmit={async (values) => {
                console.log(values);
              }}>
              {() => (
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
                      <ErrorMessage
                        component='p'
                        name='email'
                        className="text-xs mt-1 h-8 max-h-8 before:content-['*'] before:inline-block"
                      />
                    </div>
                    <div className='flex flex-col'>
                      <label htmlFor='password'>Пароль:</label>
                      <PasswordInput className='mt-3' name='password' id='password' placeholder='пароль' />
                      <ErrorMessage
                        component='p'
                        name='password'
                        className="text-xs mt-1 h-8 max-h-8 before:content-['*'] before:inline-block"
                      />
                    </div>
                  </div>
                  <button
                    type='submit'
                    className='w-full text-center text-heading-color rounded-md mt-5 font-bold py-3 bg-btn-bg'>
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
