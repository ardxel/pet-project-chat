import CallEndOutlinedIcon from '@mui/icons-material/CallEndOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import { FC } from 'react';
import { IconWrapper } from 'shared/ui';
interface AnswerOnCallProps {
  answer: (verdict: 'accept' | 'cancel') => void;
  withVideo: boolean;
  callFrom: string;
}

export const AnswerOnCall: FC<AnswerOnCallProps> = (props) => {
  const { answer, callFrom, withVideo } = props;

  return (
    <div className='flex min-h-[24rem] min-w-[16rem] flex-col justify-center gap-y-14 rounded-md'>
      <div className='flex w-full flex-col justify-center'>
        <p>Входящий звонок от...</p>
        <h5 className='mt-2 text-lg'>{callFrom}</h5>
      </div>
      <div className='flex items-center justify-center'>
        <h4>{withVideo ? 'видеозвонок' : 'аудиозвонок'}</h4>
      </div>
      <div className='flex w-full items-center justify-center gap-x-4'>
        <button onClick={() => answer('accept')}>
          <IconWrapper className='h-12 w-12 bg-green-500'>
            <CallOutlinedIcon className='!text-white' />
          </IconWrapper>
        </button>
        <button onClick={() => answer('cancel')}>
          <IconWrapper className='h-12 w-12 bg-rose-500'>
            <CallEndOutlinedIcon className='!text-white' />
          </IconWrapper>
        </button>
      </div>
    </div>
  );
};
