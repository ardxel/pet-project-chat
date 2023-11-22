import { AddContact } from 'features/contact/add';
import { FC } from 'react';

interface LeftBarHeaderProps {}

export const LeftBarHeader: FC<LeftBarHeaderProps> = () => {
  return (
    <div className='pt-5 pb-2 px-6'>
      <div className='w-full flex items-center justify-between mb-7'>
        <div>
          <h1 className='text-xl'>Контакты</h1>
          <p className='mt-2 text-xs'>127 контактов</p>
        </div>

        <AddContact />
      </div>
    </div>
  );
};
