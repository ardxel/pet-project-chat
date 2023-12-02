import { Suspense, lazy, useEffect, useState } from 'react';
import 'react-phone-number-input/style.css';
import { Location, useLocation } from 'react-router';
import { ScaleLoader } from 'react-spinners';
import { wait } from 'shared/lib';
import { HorizontalTabs } from 'shared/ui';

const tabOptions = ['Изменить данные', 'Сменить пароль', 'Изменить другие данные'];

const lazyWithDelay = (factory: () => Promise<any>, delay = 1000000) => {
  return lazy(() => Promise.all([factory(), wait(delay)]).then(([module]) => module));
};

const ProfilePersonalInfoTab = lazy(() => import('./personalInfo'));
const ProfileChangePasswordTab = lazy(() => import('./changePassword'));
const ProfileRestInfoTab = lazy(() => import('./restInfo'));
// const ProfileRestInfoTab = lazyWithDelay(() => import('./restInfo'));

export interface ProfileFormProps {
  enabledEditingByUser: boolean;
  toggleEditByUser?: () => void;
}

type LocationState = { passwordTab?: boolean; editProfileMain?: boolean };

export const ProfileDetails = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [enabledEditingByUser, setEnabledEditingByUser] = useState(false);
  const location = useLocation() as Location<LocationState>;

  useEffect(() => {
    if (!location?.state) return;
    if ('editProfileMain' in location.state) {
      setSelectedTab(0);
      setEnabledEditingByUser(location?.state.editProfileMain);
    }
    if ('passwordTab' in location.state) {
      setSelectedTab(1);
    }
  }, [location]);

  const toggleEditByUser = () => {
    setEnabledEditingByUser((prev) => !prev);
  };

  return (
    <div className='flex flex-col'>
      <div className='mt-5 flex w-full items-center justify-between'>
        <HorizontalTabs
          value={selectedTab}
          items={tabOptions}
          onSelect={(index) => setSelectedTab(index)}
          className='text-[0.6rem] font-semibold text-gray-500 dark:text-gray-400 xs2:text-[0.7rem] xs1:text-xs'
        />
      </div>
      <div className='relative mt-2 min-h-[30vh] w-full rounded-b-2xl bg-bg p-7'>
        <Suspense
          fallback={
            <div className='absolute left-0 right-0 top-0 flex h-full w-full items-center justify-center'>
              <ScaleLoader className='[&>span]:!bg-blue-500' />
            </div>
          }>
          {selectedTab === 0 && (
            <ProfilePersonalInfoTab enabledEditingByUser={enabledEditingByUser} toggleEditByUser={toggleEditByUser} />
          )}
          {selectedTab === 1 && <ProfileChangePasswordTab />}
          {selectedTab === 2 && <ProfileRestInfoTab />}
        </Suspense>
      </div>
    </div>
  );
};
