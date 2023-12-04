import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { selectUserData } from 'entities/session';
import { Field, Form, Formik } from 'formik';
import { ProfileFormProps } from 'pages/profile/details';
import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { IconWrapper } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import { changeEmailThunk } from '../model';

export const ProfileChangeEmail: FC<ProfileFormProps> = ({ enabledEditingByUser }) => {
  const user = useAppSelector(selectUserData);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();

  const isDifference = (val: string) => val !== user.email;

  return (
    <Formik
      enableReinitialize={true}
      validationSchema={yup.object().shape({
        email: yup
          .string()
          .email('Неправильный почтовый адрес.')
          .test('is-different', 'Почтовые адрес соответствует текущему', isDifference)
          .required('введите почтовый адрес'),
      })}
      initialValues={{ email: user.email }}
      onSubmit={async (values, actions) => {
        try {
          if (!values.email.length) return;
          await dispatch(changeEmailThunk({ _id: user._id, ...values })).unwrap();

          actions.resetForm({ values: { email: user.email } });
          setIsEdit(false);
          setError('');
        } catch (error) {
          console.log(error);
          setError((error as Error).message);
          actions.resetForm({ values: { email: '' } });
        }
      }}>
      {({ isSubmitting, isValid, dirty, resetForm, errors, values }) => (
        <Form
          className={twMerge(
            'flex w-full flex-col rounded-md xs2:p-4 ',
            enabledEditingByUser ? 'border border-border' : '',
          )}>
          <div className='flex w-full flex-col gap-x-4 lg:flex-row lg:justify-between'>
            <div className='flex w-full flex-col'>
              <div className='flex w-full flex-col gap-x-4 xs2:flex-row lg:gap-x-6'>
                <label htmlFor='input-change-email' className='w-full xs2:w-2/4 lg:w-1/4 '>
                  Почтовый адрес
                </label>
                {Boolean(error) && (
                  <h1 className='w-full text-sm text-rose-500 first-letter:capitalize xs2:w-2/4 lg:w-3/4'>{error}</h1>
                )}
              </div>
              <div className='relative w-full'>
                <Field
                  onFocus={(event) => event.target.select()}
                  className={twMerge(
                    'form-input mt-2 h-10 w-full duration-300 focus:border-blue-500',
                    !isEdit ? '!bg-icon-bg !text-gray-400 opacity-50 dark:!text-gray-300' : '',
                    enabledEditingByUser ? 'pointer-events-auto' : 'pointer-events-none',
                  )}
                  name='email'
                  placeholder={user.email}
                  disabled={!isEdit && !enabledEditingByUser}
                  id='input-change-email'
                />
                <div
                  className='absolute bottom-[1px] right-[1px] border-r-border'
                  title={
                    errors['email']
                      ? errors['email']
                      : isDifference(values.email)
                        ? undefined
                        : 'Ваш почтовый адрес совпадает с текущим'
                  }>
                  {isEdit && enabledEditingByUser ? (
                    <button type='submit' disabled={isSubmitting}>
                      <IconWrapper
                        className={twMerge(
                          '!bg-blue-900 duration-300 [&>*]:!text-gray-300',
                          'h-[38px] w-[38px] rounded-none rounded-l-[5px]',
                          isValid && dirty
                            ? '!bg-blue-600 hover:!bg-blue-800 [&>*]:!text-white'
                            : '!cursor-default !bg-blue-900',
                        )}>
                        <DoneOutlinedIcon className='!h-5 !w-5' />
                      </IconWrapper>
                    </button>
                  ) : null}
                  {enabledEditingByUser ? (
                    <button
                      type='button'
                      onClick={() => {
                        setIsEdit(!isEdit);
                        setError('');
                        resetForm();
                      }}>
                      <IconWrapper
                        className={twMerge(
                          'h-[38px] w-[38px]',
                          isEdit ? 'rounded-none rounded-r-[5px]' : 'rounded-[5px]',
                        )}>
                        {isEdit ? (
                          <CloseOutlinedIcon className='!h-5 !w-5' />
                        ) : (
                          <EditOutlinedIcon className='!h-5 !w-5' />
                        )}
                      </IconWrapper>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
