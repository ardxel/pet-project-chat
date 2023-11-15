import { IUser } from 'entities/session';
import { FC, memo } from 'react';
import { twMerge } from 'tailwind-merge';
import { AvatarByFirstLetter } from '../firstLetterAvatar';

interface UserAvatarProps {
  user: Partial<IUser>;
  className?: string;
}

export const UserAvatar: FC<UserAvatarProps> = memo(({ user, className }) => {
  const hasAvatar = Boolean(user.avatar);

  if (hasAvatar) {
    return (
      <img
        className={twMerge('rounded-md object-cover overflow-hidden', 'absolute w-full h-full', className)}
        src={user.avatar}
      />
    );
  }

  return <AvatarByFirstLetter name={user.name} className={className} />;
});
