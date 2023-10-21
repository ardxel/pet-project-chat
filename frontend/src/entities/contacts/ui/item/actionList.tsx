import { userActionItems } from 'shared/custom';
import { DropdownListItem, DropdownListItemProps } from 'shared/ui';

const { viewProfile, audioCall, videoCall, sendMessage, remove, report } = userActionItems;

const DropdownListButton = ({ Icon, text, ...rest }: DropdownListItemProps) => (
  <DropdownListItem as='button' Icon={Icon} text={text} {...rest} />
);

export const ActionList = () => {
  return (
    <>
      <div className='border-b border-border flex flex-col gap-y-3'>
        <DropdownListButton Icon={<viewProfile.Icon />} text={viewProfile.text} />
      </div>
      <div className='border-b border-border flex flex-col gap-y-3'>
        <DropdownListButton Icon={<audioCall.Icon />} text={audioCall.text} />
        <DropdownListButton Icon={<videoCall.Icon />} text={videoCall.text} />
        <DropdownListButton Icon={<sendMessage.Icon />} text={sendMessage.text} />
      </div>
      <div className='flex flex-col gap-y-3'>
        <DropdownListButton Icon={<remove.Icon />} text={remove.text} />
        <DropdownListButton Icon={<report.Icon />} text={report.text} />
      </div>
    </>
  );
};
