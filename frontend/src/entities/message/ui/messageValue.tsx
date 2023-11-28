import PhoneForwardedOutlinedIcon from '@mui/icons-material/PhoneForwardedOutlined';
import PhoneMissedOutlinedIcon from '@mui/icons-material/PhoneMissedOutlined';
import { selectUserId } from 'entities/session';
import { duration, utc } from 'moment';
import { FC, memo } from 'react';
import Linkify from 'react-linkify';
import { useAppSelector } from 'shared/model';
import { IconWrapper } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { messageUtil as msgUtils } from '../lib';
import { IMessage } from '../model';

interface MessageValueProps {
  message: IMessage;
}

const secondsToHHmmss = (seconds: number) => {
  if (seconds === 0) {
    return null;
  }

  const _duration = duration(seconds, 'seconds');

  if (seconds >= 3600) {
    return utc(_duration.asMilliseconds()).format('HH:mm:ss');
  } else {
    return utc(_duration.asMilliseconds()).format('mm:ss');
  }
};

export const MessageValue: FC<MessageValueProps> = memo(({ message }) => {
  const userId = useAppSelector(selectUserId);
  const isBgBlue = msgUtils.isMine(message, userId) && msgUtils.getType(message) === 'text';
  const showUpdatedTime = msgUtils.showUpdatedTime(message);
  const type = msgUtils.getType(message);

  if (type === 'text') {
    return (
      <div className='px-4 py-3'>
        <Linkify
          componentDecorator={(decoratedHref, decoratedText, key) => (
            <a key={key} href={decoratedHref} className='text-link-color underline'>
              {decoratedText}
            </a>
          )}>
          <p className={twMerge(isBgBlue ? 'text-white' : '', showUpdatedTime ? 'mr-10' : 'mr-5', 'min-w-[15px]')}>
            {message.text}
          </p>
        </Linkify>
      </div>
    );
  }

  const { type: callType, reason, seconds } = msgUtils.parseCallText(message);

  if (type === 'call') {
    return (
      <div className='flex items-center p-1'>
        <IconWrapper
          className={twMerge(
            '[&>*]hover:dark:!text-gray-800 h-12 w-12 !rounded-md dark:!bg-gray-100  hover:dark:!bg-gray-100 [&>*]:dark:!text-gray-800 ',
            'hover:bg-icon-bg [&>*]:hover:text-icon-color',
          )}>
          {reason === 'outgoing' ? <PhoneForwardedOutlinedIcon /> : null}
          {reason === 'missed' ? <PhoneMissedOutlinedIcon /> : null}
        </IconWrapper>
        <div className='flex flex-col px-3'>
          <h4 className='h-6 capitalize'>{`${reason} ${callType} call`}</h4>
          <p className='h-4'>{secondsToHHmmss(seconds)}</p>
        </div>
      </div>
    );
  }
});
