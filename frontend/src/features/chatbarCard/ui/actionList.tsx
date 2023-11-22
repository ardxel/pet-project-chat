import { useCallsContext } from 'entities/calls';
import { selectChatDataByChatId } from 'entities/chats';
import { FC, memo, useCallback } from 'react';
import { userActionItems } from 'shared/custom';
import { useAppSelector } from 'shared/model';
import { DropdownListItem, DropdownListItemProps } from 'shared/ui';

const { markAsRead, disableNotifications, viewProfile, audioCall, videoCall, saveToArchive, remove, report } =
  userActionItems;

const DropdownListButton = ({ Icon, text, ...rest }: DropdownListItemProps) => (
  <DropdownListItem as='button' Icon={Icon} text={text} {...rest} />
);

interface ActionListProps {
  chatId: string;
  onClose: () => void;
}

export const ActionList: FC<ActionListProps> = memo(({ chatId, onClose }) => {
  const chat = useAppSelector(selectChatDataByChatId(chatId));
  const { callUser } = useCallsContext();

  const closeMenu = () => onClose();

  const callOnline = useCallback(
    async (withVideo = false) => {
      if (!chat?.companion) return;
      const { _id, firstName, lastName, name } = chat.companion;
      const companionName = firstName && lastName ? `${firstName} ${lastName}` : name;

      closeMenu();
      await callUser({ isVideoCall: withVideo, receiverName: companionName, userId: _id });
    },
    [chat],
  );

  return (
    <>
      <div className='border-b border-border flex flex-col gap-y-3'>
        <DropdownListButton Icon={<markAsRead.Icon />} text={markAsRead.text} onClick={closeMenu} />
        <DropdownListButton Icon={<disableNotifications.Icon />} text={disableNotifications.text} onClick={closeMenu} />
        <DropdownListButton Icon={<viewProfile.Icon />} text={viewProfile.text} onClick={closeMenu} />
      </div>
      <div className='border-b border-border flex flex-col gap-y-3'>
        <DropdownListButton Icon={<audioCall.Icon />} text={audioCall.text} onClick={() => callOnline(false)} />
        <DropdownListButton Icon={<videoCall.Icon />} text={videoCall.text} onClick={() => callOnline(true)} />
      </div>
      <div className='flex flex-col gap-y-3'>
        <DropdownListButton Icon={<saveToArchive.Icon />} text={saveToArchive.text} onClick={closeMenu} />
        {/* <DropdownListButton Icon={<remove.Icon />} text={remove.text} onClick={closeMenu} /> */}
        <DropdownListButton Icon={<report.Icon />} text={report.text} onClick={closeMenu} />
      </div>
    </>
  );
});
