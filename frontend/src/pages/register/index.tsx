import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import { Paths } from 'shared/routing';
import { Logo, PasswordInput } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
// full password regex =
// ^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])([A-Za-z\d@#$%^&+=!-_.]){8,}$
export const RegistrForm = () => {
  return (
    <div className='bg-aside-bg main flex justify-center items-center'>
      <div className='w-full mx-4 xs0:mx-auto xs0:w-auto'>
        <div className='flex items-center justify-center mx-auto'>
          <Logo />
          <h1 className='text-xl'>ConnectMe</h1>
        </div>

        <div className='max-w-xl bg-bg rounded-lg'>
          <div className='px-6 py-8'>
            <h2 className='text-left text-lg mb-3'>Создать аккаунт</h2>
            <Formik
              enableReinitialize
              initialValues={{
                // agree: false,
                // name: 'vasya',
                // email: 'ard@gmail.com',
                // password: 'Onlyonemm1!',
                // repeatPassword: 'Onlyonemm1!',
                agree: false,
                name: 'ardxel',
                email: 'ard@gmail.com',
                password: 'Onlyonemm1!',
                repeatPassword: 'Onlyonemm1!',
              }}
              validationSchema={yup.object().shape({
                agree: yup.boolean().oneOf([true], 'Вы должны согласиться с Правилами и Условиями'),
                name: yup.string().min(4).required('имя пользователя является обязательным.'),
                email: yup
                  .string()
                  .email('Неправильный почтовый адрес.')
                  .required('почтовый адрес является обязательным.'),
                password: yup
                  .string()
                  .matches(/^(?=.*[A-Z])/, 'Пароль должен содержать хотя бы одну заглавную букву.')
                  .matches(/^(?=.*[a-z])/, 'Пароль должен содержать хотя бы одну строчную букву.')
                  .matches(/^(?=.*\d)/, 'Пароль должен содержать хотя бы одну цифру.')
                  .matches(/^(?=.*[@#$%^&+=!])/, 'Пароль должен содержать хотя бы один специальный символ.')
                  .matches(/^([A-Za-z\d@#$%^&+=!-_.]){6,}$/, 'Пароль должен быть не менее 6 символов в длину.')
                  .required(),
                repeatPassword: yup
                  .string()
                  .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
                  .required('Необходимо ввести пароль повторно.'),
              })}
              onSubmit={async (values) => {
                await wait(3000);
                console.log(values);
              }}>
              {() => (
                <Form>
                  <div className='grid grid-cols-1 xs0:grid-cols-2 lg:grid-cols-2 gap-y-6 xs0:gap-x-6 xs0:gap-y-4'>
                    <div className='flex flex-col'>
                      <label htmlFor='name'>Имя:</label>
                      <Field className='form-input mt-3' name='name' id='name' type='text' placeholder='ваше имя' />
                      <ErrorMessage
                        component='p'
                        name='name'
                        className="text-xs mt-1 h-8 max-h-8 before:content-['*'] before:inline-block"
                      />
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
                    <div className='flex flex-col'>
                      <label htmlFor='repeatPassword'>Повторите пароль:</label>
                      <PasswordInput
                        className=' mt-3'
                        name='repeatPassword'
                        id='repeatPassword'
                        placeholder='пароль снова'
                      />
                      <ErrorMessage
                        component='p'
                        name='repeatPassword'
                        className="text-xs mt-1 h-8 max-h-8 before:content-['*'] before:inline-block"
                      />
                    </div>
                  </div>
                  <div className='mt-4'>
                    <label className={twMerge('w-full inline-block')}>
                      <Field type='checkbox' name='agree' className='mr-2 w-4 h-4' />
                      {'Я согласен с политикой конфиденциальности и условиями'}
                      <ErrorMessage
                        name='agree'
                        component='p'
                        className="text-xs mt-1 h-8 max-h-8 before:content-['*'] before:inline-block"
                      />
                    </label>
                  </div>

                  <button
                    type='submit'
                    className='w-full text-center text-heading-color rounded-md mt-3 font-bold py-3 bg-btn-bg'>
                    Зарегистрироваться
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
