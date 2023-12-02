import { selectUserData } from 'entities/session';
import { passwordSchema } from 'features/auth/register';
import { ErrorMessage, Form, Formik } from 'formik';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { PasswordInput } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import { changePasswordThunk } from '../model';

const ErrMessage = ({ name }: { name: string }) => (
  <div className='mt-1 h-8 max-h-8'>
    <ErrorMessage component='p' name={name} className="text-xs text-red-400 before:inline-block before:content-['*']" />
  </div>
);

export const ProfileChangePassword = () => {
  const user = useAppSelector(selectUserData);
  const [fetchError, setFetchError] = useState('');
  const [completed, setCompleted] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <Formik
      validationSchema={yup.object().shape({
        oldPassword: yup.string().min(6, 'Минимальная длина пароля 6 символов.').required('Пожалуйста, введите пароль'),
        password: passwordSchema.fields.password,
        repeatPassword: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
          .required('Необходимо ввести пароль повторно.'),
      })}
      initialValues={{ oldPassword: '', password: '', repeatPassword: '' }}
      onSubmit={async (values, actions) => {
        try {
          setFetchError('');
          setCompleted(false);
          const body = {
            _id: user._id,
            oldPassword: values.oldPassword,
            newPassword: values.password,
          };
          await dispatch(changePasswordThunk(body)).unwrap();
          setCompleted(true);
          actions.resetForm();
        } catch (error) {
          const errMessage = (error as Error).message;
          setFetchError(errMessage);
          actions.resetForm();
        }
      }}>
      {({ isSubmitting, isValid, dirty }) => (
        <Form>
          <div className='flex h-full w-full flex-col rounded-md border border-border px-6 pb-6 lg:p-8'>
            <div className='mx-auto mb-4 h-8'>
              {!!fetchError && (
                <div className='w-full'>
                  <h1 className=' w-full break-words text-center text-base font-normal text-rose-500 first-letter:capitalize'>
                    Ошибка: {fetchError}
                  </h1>
                </div>
              )}
              {completed && (
                <div className='w-full'>
                  <h1 className=' w-full break-words text-center text-base font-normal first-letter:capitalize'>
                    Пароль успешно изменен!
                  </h1>
                </div>
              )}
            </div>
            <div className='flex w-full flex-col items-center justify-center gap-y-6'>
              <div className='mx-auto flex w-full max-w-[36rem] flex-col lg:max-w-[32rem]'>
                <label htmlFor='input-change-old-password' className='mb-3 text-sm font-semibold'>
                  Старый пароль
                </label>
                <PasswordInput name='oldPassword' id='input-change-old-password' />
                <ErrMessage name='oldPassword' />
              </div>
              <div className='mx-auto flex w-full max-w-[36rem] flex-col lg:max-w-[32rem]'>
                <label htmlFor='input-change-password' className='mb-3 text-sm font-semibold'>
                  Новый пароль
                </label>
                <PasswordInput name='password' id='input-change-password' />
                <ErrMessage name='password' />
              </div>
              <div className='mx-auto flex w-full max-w-[36rem] flex-col lg:max-w-[32rem]'>
                <label htmlFor='input-change-repeat-password' className='mb-3 text-sm font-semibold'>
                  Повторите новый пароль
                </label>
                <PasswordInput name='repeatPassword' id='input-change-repeat-password' />
                <ErrMessage name='repeatPassword' />
              </div>
            </div>
            <button
              type='submit'
              disabled={isSubmitting}
              className={twMerge(
                'mx-auto max-w-[12rem] rounded-md bg-blue-900 p-3 text-center text-sm font-semibold text-white duration-200',
                isValid && dirty ? 'bg-blue-600 hover:bg-blue-800' : 'cursor-default bg-blue-900',
              )}>
              Изменить пароль
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
