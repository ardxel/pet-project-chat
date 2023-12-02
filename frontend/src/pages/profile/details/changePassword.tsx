import { ProfileChangePassword } from 'features/profile/changePassword';

export default function ChangePasswordTab() {
  return (
    <div className='flex w-full flex-col lg:flex-row'>
      <div className='flex w-full flex-col gap-y-5 lg:flex-row'>
        <div className='w-full lg:w-1/4'>
          <h4 className='text-[14px] font-semibold '>Пароль доступа</h4>
          <p className='mt-3 text-xs'>Изменить персональные данные</p>
        </div>
        <div className='flex w-full flex-col gap-y-7 lg:w-3/4'>
          <ProfileChangePassword />
        </div>
      </div>
    </div>
  );
}
