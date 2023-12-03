import { useLazySearchUsersQuery } from 'entities/chats';
import { Contact, selectUserData, userUtils } from 'entities/session';
import { FC, useEffect } from 'react';
import { useAppSelector } from 'shared/model';
import { UserAvatar } from 'shared/ui';

interface MutualContactsTabProps {
  contact: Contact<true>;
}

const MutualContactsTab: FC<MutualContactsTabProps> = ({ contact }) => {
  const [fetchUsers, { data: users = [], isLoading }] = useLazySearchUsersQuery();
  const me = useAppSelector(selectUserData);

  useEffect(() => {
    const mutualContactIds = userUtils.getMutualContactIds(me, contact.user);
    fetchUsers({ ids: mutualContactIds });
  }, []);

  return (
    <div className='h-full w-full'>
      <div className='grid grid-cols-1 gap-6 xs1:grid-cols-2 3xl:!grid-cols-5 lg:grid-cols-3 xl:grid-cols-4'>
        {!isLoading &&
          users.map((user, i) => {
            return (
              <div
                className='flex h-44 w-full flex-col items-center rounded-md border border-border p-5 xs1:h-44 3xl:!h-[11rem] lg:h-44 xl:!h-[10rem]'
                key={i}>
                <UserAvatar
                  user={user}
                  className='mb-2 h-3/5 max-h-[4.5rem] w-3/5 max-w-[4.5rem] flex-shrink-0 rounded-full'
                />
                {user?.name && <p className='mb-2 rounded-sm text-center text-sm font-normal'>{`@${user?.name}`}</p>}
                <div className='h-6'>
                  {userUtils.hasFullname(user) && <h4 className='text-sm '>{userUtils.getName(user)}</h4>}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MutualContactsTab;
