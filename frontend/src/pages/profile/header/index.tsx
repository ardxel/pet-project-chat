import { formatContactWord } from 'entities/contacts';
import { selectUserData, userUtils } from 'entities/session';
import { useAppSelector } from 'shared/model';
import { UserAvatar } from 'shared/ui';

export const ProfileHeader = () => {
  const user = useAppSelector(selectUserData);
  const length = userUtils.getUserContactsLength(user);

  return (
    <div className='w-full'>
      <div className='relative w-full rounded-2xl bg-bg p-5 xs2:p-7'>
        <div className='flex items-end gap-x-4'>
          <div className='flex h-24 w-24 xs2:h-32 xs2:w-32'>
            <UserAvatar user={user} className='h-full w-full rounded-lg border-[0.2rem] [&>h1]:text-[3rem]' />
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-col items-baseline gap-x-2 xs1:flex-row'>
              <h1 className='text-base text-gray-500 dark:text-gray-300 xs3:text-lg xs1:text-xl'>
                {userUtils.getName(user)}
              </h1>
              <p className='font-600 text-[0.9rem] text-sm text-form-color xs1:text-base'>{'@' + user.name}</p>
            </div>
            <div className='inline-block h-4 leading-4'>
              <p className='text-[0.8rem] text-form-color'>{`${length} ${formatContactWord(length)}`}</p>
            </div>
            <div className='h-5'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
