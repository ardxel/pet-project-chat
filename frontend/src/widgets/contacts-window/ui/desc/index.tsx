import { selectOpenedPageContactData } from 'entities/contacts';
import { ActionButtonGroup } from 'features/actionButtonGroup';
import { Suspense, lazy, useState } from 'react';
import { ScaleLoader } from 'react-spinners';
import { useAppSelector } from 'shared/model';
import { HorizontalTabs } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { ContactsWindowAboutTab } from './about.tab';

const tabOptions = ['Информация', 'Общие контакты', 'Галерея'] as const;

const MutualContactsTab = lazy(() => import('../desc/mutuals.tab'));

export const ContactWindowDescription = function () {
  const contact = useAppSelector(selectOpenedPageContactData);
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className='flex flex-col'>
      <div className='mt-5 flex w-full items-center justify-between'>
        <HorizontalTabs
          items={tabOptions}
          onSelect={(index) => setSelectedTab(index)}
          className='text-[0.7rem] font-semibold text-gray-500 dark:text-gray-400 xs1:text-xs'
        />
        <ActionButtonGroup
          targetUser={contact.user}
          btnClassName='w-8 h-8 [&>div]:!p-2 [&>div]:!bg-transparent [&>div]:hover:!bg-icon-active-bg'
          menuClassName={twMerge('w-[250px]')}
          options={{
            audioCall: true,
            videoCall: true,
            sendMessage: { hr: true },
            block: true,
            report: true,
          }}
        />
      </div>
      <div className='w-full rounded-b-2xl bg-bg p-7'>
        <Suspense
          fallback={
            <div className='flex h-full w-full items-center justify-center'>
              <ScaleLoader className='[&>span]:!bg-blue-500' />
            </div>
          }>
          {selectedTab === 0 && <ContactsWindowAboutTab contact={contact} />}
          {selectedTab === 1 && <MutualContactsTab contact={contact} />}
        </Suspense>
      </div>
    </div>
  );
};
