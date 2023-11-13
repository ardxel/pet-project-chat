import { IUser } from 'entities/session';
import { FC, memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { AvatartByFirstLetter } from '../firstLetterAvatar';

interface UserAvatarProps {
  user: Partial<IUser>;
}

export const UserAvatar: FC<UserAvatarProps> = memo(({ user }) => {
  const hasAvatar = Boolean(user.avatar);

  if (hasAvatar) {
    return (
      <img className={twMerge('rounded-md object-cover overflow-hidden', 'absolute w-full h-full')} src={user.avatar} />
    );
  }

  return <AvatartByFirstLetter name={user.name} />;
});
