import { IUser, userUtils } from 'entities/session';
import { FC, memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { AvatarByFirstLetter } from '../firstLetterAvatar';

interface UserAvatarProps {
  user: Partial<IUser>;
  className?: string;
}

export const UserAvatar: FC<UserAvatarProps> = memo(({ user, className }) => {
  const hasAvatar = Boolean(user?.avatar);

  if (hasAvatar) {
    return (
      <div className={twMerge('relative overflow-hidden', className)}>
        <img
          className={'absolute inset-0 left-0 right-0 top-0 h-full w-full overflow-hidden object-cover'}
          src={user?.avatar}
          alt={`Avatar of ${userUtils.getName(user)}`}
        />
      </div>
    );
  }

  return <AvatarByFirstLetter name={user?.name} className={className} />;
});
