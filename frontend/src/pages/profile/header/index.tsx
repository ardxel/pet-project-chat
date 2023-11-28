import { formatContactWord } from 'entities/contacts';
import { selectUserData, userUtils } from 'entities/session';
import { useAppSelector } from 'shared/model';
import { UserAvatar } from 'shared/ui';

export const ProfileHeader = () => {
  const user = useAppSelector(selectUserData);
  const length = userUtils.getUserContactsLength(user);

  return (
    <div className='w-full'>
      <div className='w-full p-7 relative rounded-2xl bg-bg'>
        <div className='flex items-end gap-x-4'>
          <div className='w-24 h-24 xs2:w-32 xs2:h-32 flex'>
            <UserAvatar user={user} className='w-full h-full [&>h1]:text-[3rem] border-[0.2rem] rounded-lg' />
          </div>
          <div className='flex flex-col'>
            <div className='flex gap-x-2 items-baseline'>
              <h1 className='text-xl text-gray-500 dark:text-gray-300'>{userUtils.getName(user)}</h1>
              <p className='text-[0.9rem] text-form-color font-600'>{'@' + user.name}</p>
            </div>
            <div className='inline-block leading-4 h-4'>
              <p className='text-[0.8rem] text-form-color'>{`${length} ${formatContactWord(length)}`}</p>
            </div>
            <div className='h-5'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
