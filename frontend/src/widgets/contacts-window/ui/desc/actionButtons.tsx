import { useCallsContext } from 'entities/calls';
import { selectChatIdByCompanionId, setOpenedChatId } from 'entities/chats';
import { selectOpenedPageContactData } from 'entities/contacts';
import { userUtils } from 'entities/session';
import { createPrivateChat } from 'features/chat/create/model';
import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { userActionItems } from 'shared/custom';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { Paths } from 'shared/routing';
import { DropdownListItem, DropdownListItemProps } from 'shared/ui';

const { audioCall, videoCall, sendMessage, block, report } = userActionItems;

const DropdownListButton = memo(({ Icon, text, ...rest }: DropdownListItemProps) => (
  <DropdownListItem as='button' type='button' Icon={Icon} text={text} {...rest} />
));

interface ContactWindowActionButtonsProps {
  onClose: () => void;
}

export const ContactWindowActionButtons: FC<ContactWindowActionButtonsProps> = ({ onClose }) => {
  const contact = useAppSelector(selectOpenedPageContactData);
  const chatId = useAppSelector(selectChatIdByCompanionId(contact.user._id));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { callUser } = useCallsContext();

  const remotelyOpenChat = useCallback(
    (chatId: string | undefined) => {
      if (chatId) {
        dispatch(setOpenedChatId(chatId));
      }
      onClose();
    },
    [chatId],
  );

  const handleCallUser = useCallback(
    async (withVideo: boolean) => {
      const options = {
        receiverName: userUtils.getName(contact.user),
        userId: contact.user._id,
        isVideoCall: withVideo,
      };

      onClose();
      await callUser(options);
    },
    [contact],
  );

  const handleSendMessage = useCallback(async () => {
    if (!chatId) {
      await dispatch(createPrivateChat(contact.user._id)).unwrap();
    }

    remotelyOpenChat(chatId);
    navigate(Paths.chat, { replace: true });
    onClose();
  }, [contact]);

  return (
    <>
      <div className='flex flex-col gap-y-3 border-b border-border'>
        <DropdownListButton Icon={<audioCall.Icon />} text={audioCall.text} onClick={() => handleCallUser(false)} />
        <DropdownListButton Icon={<videoCall.Icon />} text={videoCall.text} onClick={() => handleCallUser(true)} />
        <DropdownListButton Icon={<sendMessage.Icon />} text={sendMessage.text} onClick={handleSendMessage} />
      </div>
      <div className='flex flex-col gap-y-3'>
        <DropdownListButton Icon={<block.Icon />} text={block.text} />
        <DropdownListButton Icon={<report.Icon />} text={report.text} />
      </div>
    </>
  );
};
