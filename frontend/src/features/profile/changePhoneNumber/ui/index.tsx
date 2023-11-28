import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { selectUserData } from 'entities/session';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { IconWrapper, MobileInputWithFormik } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import * as yup from 'yup';
import { changePhoneNumberThunk } from '../model';

export const ProfileChangePhoneNumber = () => {
  const user = useAppSelector(selectUserData);
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState<string>('');
  const dispatch = useAppDispatch();

  return (
    <Formik
      initialValues={{ phoneNumber: user.phoneNumber || '' }}
      validationSchema={yup.object().shape({
        phoneNumber: yup
          .string()
          .test('isValidPhoneNumber', 'Неправильный номер телефона', (value) => isValidPhoneNumber(value))
          .test(
            'isDifferentPhoneNumber',
            'Номер телефона совпадает с предыдущим',
            (value) => value !== user.phoneNumber,
          )
          .required('Необходимо ввести номер телефона'),
      })}
      onSubmit={async (values, actions) => {
        try {
          if (!values.phoneNumber.length) return;
          await dispatch(changePhoneNumberThunk({ _id: user._id, ...values })).unwrap();
          actions.resetForm({ values: { phoneNumber: values.phoneNumber } });
          setIsEdit(false);
          setError('');
        } catch (error) {
          console.log(error);
          setError((error as Error).message);
          actions.resetForm({ values: { phoneNumber: user.phoneNumber || '' } });
        }
      }}>
      {({ isSubmitting, isValid, dirty, resetForm, errors }) => (
        <Form className='flex w-full flex-col rounded-md '>
          <div className='flex w-full flex-col gap-x-4 lg:flex-row lg:justify-between'>
            <div className='flex w-full flex-col'>
              <div className='flex w-full flex-col gap-x-4 xs2:flex-row lg:gap-x-6'>
                <label htmlFor='input-change-phone-number' className='mb-2 w-full xs2:w-2/4 lg:w-2/4'>
                  Номер телефона
                </label>
                {Boolean(error) && (
                  <h1 className='w-full text-sm text-red-500 first-letter:capitalize xs2:w-2/4 lg:w-2/4'>{error}</h1>
                )}
              </div>
              <div className='relative w-full'>
                <MobileInputWithFormik id='input-change-phone-number' name='phoneNumber' disabled={!isEdit} />
                <div
                  className='absolute -bottom-[1px] right-[1px] h-full transform border-r-border'
                  title={errors['phoneNumber']}>
                  {isEdit && (
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
                  )}
                  <button
                    type='button'
                    onClick={() => {
                      resetForm({ values: { phoneNumber: isEdit ? user.phoneNumber || '' : '' } });
                      setIsEdit(!isEdit);
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
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};
