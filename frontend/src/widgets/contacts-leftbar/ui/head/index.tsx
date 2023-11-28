import { AddContact } from 'features/contact/add';
import { FC } from 'react';

interface LeftBarHeaderProps {}

export const LeftBarHeader: FC<LeftBarHeaderProps> = () => {
  return (
    <div className='px-6 pb-2 pt-5'>
      <div className='mb-7 flex w-full items-center justify-between'>
        <div>
          <h1 className='text-xl'>Контакты</h1>
          <p className='mt-2 text-xs'>127 контактов</p>
        </div>

        <AddContact />
      </div>
    </div>
  );
};
