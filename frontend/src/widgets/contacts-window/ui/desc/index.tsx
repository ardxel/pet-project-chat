import { selectOpenedPageContactData } from 'entities/contacts';
import { ActionButtonGroup } from 'features/actionButtonGroup';
import { useState } from 'react';
import { useAppSelector } from 'shared/model';
import { HorizontalTabs } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { ContactsWindowAboutTab } from './about.tab';

const tabOptions = ['Информация', 'Общие контакты', 'Галерея'] as const;

export const ContactWindowDescription = function () {
  const contact = useAppSelector(selectOpenedPageContactData);
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className='flex flex-col'>
      <div className='w-full flex items-center justify-between mt-5'>
        <HorizontalTabs
          items={tabOptions}
          onSelect={(index) => setSelectedTab(index)}
          className='font-semibold text-[0.7rem] xs1:text-xs text-gray-500 dark:text-gray-400'
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
      <div className='w-full p-7 bg-bg rounded-b-2xl'>
        {selectedTab === 0 && <ContactsWindowAboutTab contact={contact} />}
      </div>
    </div>
  );
};
