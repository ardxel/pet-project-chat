import { ProfileChangeCountry } from 'features/profile/changeCountry';
import { ProfileChangeEmail } from 'features/profile/changeEmail';
import { ProfileChangePhoneNumber } from 'features/profile/changePhoneNumber';
import { ProfileEditFullname } from 'features/profile/editFullname';
import { lazy, useState } from 'react';
import 'react-phone-number-input/style.css';
import { HorizontalTabs } from 'shared/ui';
const tabOptions = ['Изменить данные', 'Сменить пароль', 'Изменить другие данные'];

const ProfileChangePassword = lazy(() => import('features/profile/changePassword'));

export const ProfileDetails = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className='flex flex-col'>
      <div className='mt-5 flex w-full items-center justify-between'>
        <HorizontalTabs
          items={tabOptions}
          onSelect={(index) => setSelectedTab(index)}
          className='text-[0.7rem] font-semibold text-gray-500 dark:text-gray-400 xs1:text-xs'
        />
      </div>
      <div className='mt-2 w-full rounded-b-2xl bg-bg p-7'>
        {selectedTab === 0 && (
          <div className='flex w-full flex-col lg:flex-row'>
            <div className='flex w-full flex-col gap-y-5 lg:flex-row'>
              <div className='w-full lg:w-1/4'>
                <h4 className='text-[14px] font-semibold '>Персональная информация</h4>
                <p className='mt-3 text-xs'>Изменить персональные данные</p>
              </div>
              <div className='flex w-full flex-col gap-y-7 lg:w-3/4'>
                <ProfileEditFullname />
                <ProfileChangeEmail />
                <div className='flex w-full gap-x-4 rounded-md border border-border p-4'>
                  <ProfileChangePhoneNumber />
                  <ProfileChangeCountry />
                </div>
              </div>
            </div>
          </div>
        )}
        {selectedTab === 1 && (
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
        )}
      </div>
    </div>
  );
};
