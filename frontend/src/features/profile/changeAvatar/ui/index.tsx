import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import { selectUserData } from 'entities/session';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/model';
import { twMerge } from 'tailwind-merge';
import { changeAvatarThunk } from '../model';

export const ChangeProfileAvatar = () => {
  const user = useSelector(selectUserData);
  const [fetchError, setFetchError] = useState('');
  const dispatch = useAppDispatch();
  const MAX_FILE_SIZE = 1024 * 1024; // 1MB

  return (
    <Formik
      initialValues={{ avatar: null } as { avatar?: File }}
      validate={(values) => {
        if (!values.avatar) {
          return { avatar: 'Файл не загружен' };
        }

        if (!values.avatar.type.startsWith('image')) {
          return { avatar: 'Недопустимый формат файла' };
        }

        if (values.avatar.size > MAX_FILE_SIZE) {
          return { avatar: 'Превышен размер файла, максимальный размер: 1MB.' };
        }
      }}
      onSubmit={async (values, actions) => {
        try {
          const body = new FormData();
          body.append('avatar', values.avatar);
          body.append('userId', user._id);

          await dispatch(changeAvatarThunk(body)).unwrap();

          setFetchError('');

          actions.resetForm();
        } catch (error) {
          console.error(error);
          setFetchError((error as Error).message);
          actions.resetForm();
        }
      }}>
      {({ isSubmitting, isValid, dirty, errors, setFieldValue, values }) => (
        <Form className='flex w-full flex-col rounded-md '>
          <div className='flex w-full flex-col gap-x-4 lg:flex-row lg:justify-between'>
            <div className='flex w-full flex-col'>
              <div className='flex w-full flex-col gap-x-4 xs2:flex-row lg:gap-x-6'>
                {Boolean(fetchError) && (
                  <h1 className='w-full text-sm text-red-500 first-letter:capitalize xs2:w-2/4 lg:w-2/4'>
                    {fetchError}
                  </h1>
                )}
              </div>
              <div className='mt-3 flex w-full flex-col items-center gap-y-6 md:mt-0 md:flex-row md:justify-between'>
                <div className='flex flex-col items-center justify-center gap-y-3'>
                  <div>
                    <label
                      htmlFor='input-upload-avatar'
                      className={twMerge(
                        'block w-full px-3 py-1 xs2:px-4 xs2:py-2 xs1:px-5 xs1:py-3',
                        'rounded-md border-0 text-center',
                        'cursor-pointer text-sm font-normal xs1:text-lg',
                        'bg-blue-600 text-white',
                        'hover:bg-blue-700',
                        'disabled:pointer-events-none disabled:opacity-50',
                        'dark:bg-blue-500 dark:hover:bg-blue-400',
                      )}>
                      <p>Выберите файл</p>
                      <input
                        type='file'
                        name='avatar'
                        id='input-upload-avatar'
                        accept='images/*'
                        className='hidden'
                        onChange={(e) => {
                          e.preventDefault();
                          if (e.currentTarget.files) {
                            setFieldValue('avatar', e.currentTarget.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>
                  {errors['avatar'] ? (
                    <p className='mt-1 h-8 max-h-8 w-full text-left text-[14px] text-red-400 before:inline-block before:content-["*"]'>
                      {errors.avatar as string}
                    </p>
                  ) : null}
                </div>
                <div className='flex flex-col items-center justify-center gap-y-4'>
                  <div className='relative h-[50vw] w-[50vw] rounded-lg border-4 border-border xs2:h-[16rem] xs2:w-[16rem]'>
                    {values?.avatar ? (
                      <img
                        className='h-full w-full object-cover'
                        src={URL.createObjectURL(values.avatar)}
                        alt='Avatar Preview'
                      />
                    ) : (
                      <span className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center font-semibold'>
                        Загрузите файл для просмотра
                      </span>
                    )}
                  </div>
                  <button
                    type='submit'
                    className={twMerge(
                      'bg-blue-500 hover:bg-blue-400',
                      'group flex items-center gap-x-2 rounded-md px-4 py-2',
                      'cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-700 disabled:hover:bg-blue-700',
                    )}
                    disabled={!(isValid && dirty && !!values.avatar && isSubmitting)}>
                    <p className='text-center text-sm font-normal text-white group-disabled:text-gray-300 '>
                      Отправить
                    </p>
                    {<DoneOutlinedIcon className='!h-6 !w-6 group-disabled:text-gray-300 ' />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
