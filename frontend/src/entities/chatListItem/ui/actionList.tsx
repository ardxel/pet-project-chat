import { userActionItems } from 'shared/custom';
import { DropdownListItem, DropdownListItemProps } from 'shared/ui';

const { markAsRead, disableNotifications, viewProfile, audioCall, videoCall, saveToArchive, remove, report } =
  userActionItems;

const DropdownListButton = ({ Icon, text, ...rest }: DropdownListItemProps) => (
  <DropdownListItem as='button' Icon={Icon} text={text} {...rest} />
);

export const ActionList = () => {
  return (
    <>
      <div className='border-b border-border flex flex-col gap-y-3'>
        <DropdownListButton Icon={<markAsRead.Icon />} text={markAsRead.text} />
        <DropdownListButton Icon={<disableNotifications.Icon />} text={disableNotifications.text} />
        <DropdownListButton Icon={<viewProfile.Icon />} text={viewProfile.text} />
      </div>
      <div className='border-b border-border flex flex-col gap-y-3'>
        <DropdownListButton Icon={<audioCall.Icon />} text={audioCall.text} />
        <DropdownListButton Icon={<videoCall.Icon />} text={videoCall.text} />
      </div>
      <div className='flex flex-col gap-y-3'>
        <DropdownListButton Icon={<saveToArchive.Icon />} text={saveToArchive.text} />
        <DropdownListButton Icon={<remove.Icon />} text={remove.text} />
        <DropdownListButton Icon={<report.Icon />} text={report.text} />
      </div>
    </>
  );
};
