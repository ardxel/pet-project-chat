import { formatContactWord, selectContactsLength } from 'entities/contacts';
import { AddContact } from 'features/contact/add';
import { FC } from 'react';
import { useAppSelector } from 'shared/model';

interface LeftBarHeaderProps {}

export const LeftBarHeader: FC<LeftBarHeaderProps> = () => {
  const contactsLength = useAppSelector(selectContactsLength);
  return (
    <div className='px-6 pb-2 pt-5'>
      <div className='mb-7 flex w-full items-center justify-between'>
        <div>
          <h1 className='text-xl'>Контакты</h1>
          <p className='mt-2 text-xs'>
            {contactsLength} {formatContactWord(contactsLength)}
          </p>
        </div>

        <AddContact />
      </div>
    </div>
  );
};
