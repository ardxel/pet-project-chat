import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CakeIcon from '@mui/icons-material/Cake';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import FemaleIcon from '@mui/icons-material/Female';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
import MaleIcon from '@mui/icons-material/Male';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Contact } from 'entities/session';
import { FC } from 'react';
import { IconWrapper } from 'shared/ui';

interface ContactWindowAboutTabProps {
  contact: Contact<true>;
}

export const ContactsWindowAboutTab: FC<ContactWindowAboutTabProps> = ({ contact }) => {
  return (
    <div className='flex flex-col gap-y-4'>
      <h2 className='font-semibold text-sm xs1:text-base'>{`Обо ${contact.user.firstName || contact.user.name}`}</h2>
      {contact.user.about && <p>{contact.user.about}</p>}
      <div className='flex items-center gap-x-3'>
        <button>
          <IconWrapper className='w-8 h-8 p-2 xs1:w-10 xs1:h-10 xs1:!p-3 rounded-md'>
            <FacebookOutlinedIcon className='!w-4 !h-4 xs1:!w-5 xs1:!h-5' />
          </IconWrapper>
        </button>
        <button>
          <IconWrapper className='w-8 h-8 p-2 xs1:w-10 xs1:h-10 xs1:!p-3 rounded-md'>
            <TwitterIcon className='!w-4 !h-4 xs1:!w-5 xs1:!h-5' />
          </IconWrapper>
        </button>
        <button>
          <IconWrapper className='w-8 h-8 p-2 xs1:w-10 xs1:h-10 xs1:!p-3 rounded-md'>
            <InstagramIcon className='!w-4 !h-4 xs1:!w-5 xs1:!h-5' />
          </IconWrapper>
        </button>
      </div>
      <div className='flex flex-col'>
        <h2 className='font-semibold mb-2 text-sm xs1:text-base'>Базовая информация</h2>
        <div className='flex flex-wrap items-center gap-x-6'>
          <div className='flex flex-col'>
            <CakeIcon className='[&>*]:!text-gray-400 dark:[&>*]:!text-gray-500' />
            <p className='text-gray-400 dark:text-gray-400 text-xs mt-2'>День рождения</p>
            <h2 className='font-semibold leading-8 text-sm xs1:text-base'>Июль 11</h2>
          </div>
          {contact.user.gender && (
            <div className='flex flex-col'>
              {contact.user.gender === 'male' ? (
                <MaleIcon className='[&>*]:!text-gray-400 dark:[&>*]:!text-gray-500' />
              ) : (
                <FemaleIcon className='[&>*]:!text-gray-400 dark:[&>*]:!text-gray-500' />
              )}
              <p className='text-gray-400 dark:text-gray-400 text-xs mt-2'>Пол</p>
              <h2 className='font-semibold leading-8 text-sm xs1:text-base'>Мужчина</h2>
            </div>
          )}
          {contact.user.language.length > 0 && (
            <div className='flex flex-col'>
              <LanguageIcon className='[&>*]:!text-gray-400 dark:[&>*]:!text-gray-500' />
              <p className='text-gray-400 dark:text-gray-400 text-xs mt-2'>Языки</p>
              <h2 className='font-semibold leading-8 text-sm xs1:text-base'>{contact.user.language.join(', ')}</h2>
            </div>
          )}
          {contact.user.hometown && (
            <div className='flex flex-col'>
              <ApartmentIcon className='[&>*]:!text-gray-400 dark:[&>*]:!text-gray-500' />
              <p className='text-gray-400 dark:text-gray-400 text-xs mt-2'>Город</p>
              <h2 className='font-semibold leading-8 text-sm xs1:text-base'>{contact.user.hometown}</h2>
            </div>
          )}
          {contact.user.phoneNumber && (
            <div className='flex flex-col'>
              <PhoneAndroidIcon className='[&>*]:!text-gray-400 dark:[&>*]:!text-gray-500' />
              <p className='text-gray-400 dark:text-gray-400 text-xs mt-2'>Номер тел.</p>
              <h2 className='font-semibold leading-8 text-sm xs1:text-base'>{contact.user.phoneNumber}</h2>
            </div>
          )}
          {contact.user.email && (
            <div className='flex flex-col'>
              <AlternateEmailIcon className='[&>*]:!text-gray-400 dark:[&>*]:!text-gray-500' />
              <p className='text-gray-400 dark:text-gray-400 text-xs mt-2'>Email</p>
              <h2 className='font-semibold leading-8 text-sm xs1:text-base'>{contact.user.email}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
