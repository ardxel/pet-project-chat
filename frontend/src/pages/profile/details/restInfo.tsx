import { ChangeProfileAvatar } from 'features/profile/changeAvatar';

export default function ProfileRestInfoTab() {
  return (
    <div className='flex w-full flex-col lg:flex-row'>
      <div className='flex w-full flex-col gap-y-5 lg:flex-row'>
        <div className='w-full lg:w-1/4'>
          <h4 className='text-[14px] font-semibold '>Дополнительные данные</h4>
          <p className='mt-3 text-xs'>Изменить дополнительные данные</p>
        </div>
        <div className='flex w-full flex-col gap-y-7 rounded-md border border-border p-6 lg:w-3/4'>
          <ChangeProfileAvatar />
        </div>
      </div>
    </div>
  );
}
