import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { ProfileChangeCountry } from 'features/profile/changeCountry';
import { ProfileChangeEmail } from 'features/profile/changeEmail';
import { ProfileChangePhoneNumber } from 'features/profile/changePhoneNumber';
import { ProfileEditFullname } from 'features/profile/editFullname';
import 'react-phone-number-input/style.css';
import { twMerge } from 'tailwind-merge';
import { ProfileFormProps } from '.';

export default function ProfilePersonalInfoTab({ enabledEditingByUser, toggleEditByUser }: ProfileFormProps) {
  return (
    <div className='flex w-full flex-col lg:flex-row'>
      <div className='flex w-full flex-col gap-y-5 lg:flex-row'>
        <div className='w-full xs2:p-4 lg:w-1/4'>
          <h4 className='text-[14px] font-semibold '>Персональная информация</h4>
          <p className='mt-3 text-xs'>Изменить персональные данные</p>
          <button
            onClick={toggleEditByUser}
            className='group mt-3 flex items-center gap-x-2 rounded-md border border-border px-3 py-1 group-hover:border-blue-500'>
            <p className='w-20 group-hover:!text-blue-500'>{enabledEditingByUser ? 'Закрыть' : 'Изменить'}</p>
            {enabledEditingByUser ? (
              <ClearOutlinedIcon className='!h-4 !w-4 group-hover:!text-blue-500' />
            ) : (
              <BorderColorOutlinedIcon className='!h-4 !w-4 group-hover:!text-blue-500' />
            )}
          </button>
        </div>
        <div className='flex w-full flex-col gap-y-7 lg:w-3/4'>
          <ProfileEditFullname enabledEditingByUser={enabledEditingByUser} />
          <ProfileChangeEmail enabledEditingByUser={enabledEditingByUser} />
          <div
            className={twMerge(
              'flex w-full flex-col gap-x-4 gap-y-5 rounded-md xs2:p-4 lg:flex-row',
              enabledEditingByUser ? 'border border-border' : '',
            )}>
            <ProfileChangePhoneNumber enabledEditingByUser={enabledEditingByUser} />
            <ProfileChangeCountry enabledEditingByUser={enabledEditingByUser} />
          </div>
        </div>
      </div>
    </div>
  );
}
