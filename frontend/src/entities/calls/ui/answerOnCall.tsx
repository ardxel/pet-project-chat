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
  let { answer, callFrom, withVideo } = props;

  callFrom = callFrom ? callFrom : 'Jessica';
  return (
    <div className='flex flex-col justify-center min-w-[16rem] min-h-[24rem] gap-y-14 rounded-md'>
      <div className='flex flex-col w-full justify-center'>
        <p>Входящий звонок от...</p>
        <h5 className='mt-2 text-lg'>{callFrom}</h5>
      </div>
      <div className='flex items-center justify-center'>
        <h4>{withVideo ? 'видеозвонок' : 'аудиозвонок'}</h4>
      </div>
      <div className='flex gap-x-4 items-center justify-center w-full'>
        <button onClick={() => answer('accept')}>
          <IconWrapper className='bg-green-500 w-12 h-12'>
            <CallOutlinedIcon className='!text-white' />
          </IconWrapper>
        </button>
        <button onClick={() => answer('cancel')}>
          <IconWrapper className='bg-rose-500 w-12 h-12'>
            <CallEndOutlinedIcon className='!text-white' />
          </IconWrapper>
        </button>
      </div>
    </div>
  );
};
