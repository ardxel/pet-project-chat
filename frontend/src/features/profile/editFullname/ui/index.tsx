import { selectUserData } from 'entities/session';
import { Field, Form, Formik } from 'formik';
import { ProfileFormProps } from 'pages/profile/details';
import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import { editFullnameThunk } from '../model';

export const ProfileEditFullname: FC<ProfileFormProps> = ({ enabledEditingByUser }) => {
  const user = useAppSelector(selectUserData);
  const dispatch = useAppDispatch();
  return (
    <Formik
      enableReinitialize={true}
      validationSchema={yup.object().shape({
        firstName: yup
          .string()
          .matches(/^[a-zA-Zа-яА-Я]+$/, 'Можно использовать только буквы латинского алфавита или кириллицу')
          .min(2, 'Минимальная длина имени 2 символа')
          .max(20, 'Максимальная длина имени 20 символов')
          .required(),
        lastName: yup
          .string()
          .matches(/^[a-zA-Zа-яА-Я]+$/, 'Можно использовать только буквы латинского алфавита или кириллицу')
          .min(2, 'Минимальная длина фамилии 2 символа')
          .max(20, 'Максимальная длина фамилии 20 символов')
          .required(),
      })}
      initialValues={{ firstName: user.firstName || '', lastName: user.lastName || '' }}
      onSubmit={async (values) => {
        try {
          await dispatch(editFullnameThunk({ _id: user._id, ...values }));
        } catch (error) {
          console.log(error);
        }
      }}>
      {({ isSubmitting, isValid, dirty }) => (
        <Form
          className={twMerge(
            'flex w-full flex-col rounded-md p-4 ',
            enabledEditingByUser ? 'border border-border' : '',
          )}>
          <div className='flex w-full flex-col gap-x-4 lg:flex-row lg:justify-between'>
            <div className='flex w-full flex-col lg:w-1/2'>
              <label htmlFor='input-firstName' className='text-sm font-semibold'>
                Имя
              </label>
              <Field
                disabled={!enabledEditingByUser}
                className={twMerge(
                  'form-input mt-2 h-10 capitalize duration-300 focus:border-blue-500',
                  enabledEditingByUser ? 'pointer-events-auto' : 'pointer-events-none',
                )}
                name='firstName'
                placeholder={user?.firstName || 'ваше имя'}
                id='input-firstName'
              />
            </div>
            <div className='mt-5 flex w-full flex-col lg:mt-0  lg:w-1/2'>
              <label htmlFor='input-lastName' className='text-sm font-semibold'>
                Фамилия
              </label>
              <Field
                disabled={!enabledEditingByUser}
                className={twMerge(
                  'form-input mt-2 h-10 capitalize duration-300 focus:border-blue-500',
                  enabledEditingByUser ? 'pointer-events-auto' : 'pointer-events-none',
                )}
                name='lastName'
                placeholder={user.lastName || 'ваша фамилия'}
                id='input-lastName'
              />
            </div>
          </div>
          {enabledEditingByUser ? (
            <div className='mt-4 flex h-11 w-full justify-end'>
              <button
                type='submit'
                disabled={isSubmitting}
                className={twMerge(
                  'max-w-[12rem] rounded-md bg-blue-900 p-3 text-center text-sm font-semibold text-white duration-200',
                  isValid && dirty ? 'bg-blue-600 hover:bg-blue-800' : 'cursor-default bg-blue-900',
                )}>
                Отправить
              </button>
            </div>
          ) : null}
        </Form>
      )}
    </Formik>
  );
};
