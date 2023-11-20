import { IUser } from 'entities/session';
import { FC } from 'react';
import { UserAvatar } from 'shared/ui';

interface CompanionAvatarProps {
  companion: IUser;
}

export const CompanionAvatar: FC<CompanionAvatarProps> = ({ companion }) => {
  return (
    <div className='relative w-[35px] h-[35px]'>
      <UserAvatar
        user={companion}
        className='rounded-full [&>*]:!text-xl [&>*]:!leading-none [&>*]:-top-[11%] w-9 h-9 border-bg'
      />
    </div>
  );
};
