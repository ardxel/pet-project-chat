import { IUser } from 'entities/session';
import { FC } from 'react';
import { UserAvatar } from 'shared/ui';

interface CompanionAvatarProps {
  companion: IUser;
}

export const CompanionAvatar: FC<CompanionAvatarProps> = ({ companion }) => {
  return (
    <div className='relative h-[35px] w-[35px]'>
      <UserAvatar
        user={companion}
        className='h-9 w-9 rounded-full border-bg [&>*]:-top-[11%] [&>*]:!text-xl [&>*]:!leading-none'
      />
    </div>
  );
};
