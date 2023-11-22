import { useCallsContext } from 'entities/calls';
import { selectChatIdByCompanionId, setOpenedChatId } from 'entities/chats';
import { DeleteContactDto } from 'entities/contacts';
import { IUser, selectUserId } from 'entities/session';
import { createPrivateChat } from 'features/chat/create/model';
import { deleteContactThunk } from 'features/contact/delete';
import { FC, memo, useCallback } from 'react';
import { useNavigate } from 'react-router';
import { userActionItems } from 'shared/custom';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { Paths } from 'shared/routing';
import { DropdownListItem, DropdownListItemProps } from 'shared/ui';

const { viewProfile, audioCall, videoCall, sendMessage, remove, report } = userActionItems;

const DropdownListButton = memo(({ Icon, text, ...rest }: DropdownListItemProps) => (
  <DropdownListItem as='button' Icon={Icon} text={text} {...rest} />
));

interface ActionListProps {
  user: IUser;
}

export const ActionList: FC<ActionListProps> = memo(({ user }) => {
  const userId = useAppSelector(selectUserId);
  const chatId = useAppSelector(selectChatIdByCompanionId(user._id));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { callUser } = useCallsContext();

  const handleCallUser = useCallback(
    async (withVideo: boolean) => {
      const options = {
        receiverName: user.firstName ? `${user.firstName} ${user.lastName}` : user.name,
        userId: user._id,
        isVideoCall: withVideo,
      };

      await callUser(options);
    },
    [user],
  );

  const remotelyOpenChat = (chatId: string | undefined) => {
    if (chatId) {
      dispatch(setOpenedChatId(chatId));
    }
  };

  const handleSendMessage = useCallback(async () => {
    if (!chatId) {
      await dispatch(createPrivateChat(user._id)).unwrap();
    }

    remotelyOpenChat(chatId);
    navigate(Paths.chat, { replace: true });
  }, [user]);

  const handleDeleteContact = useCallback(() => {
    const body: DeleteContactDto = {
      deletedId: user._id,
      initiatorId: userId,
      returnUserAfter: false,
    };

    dispatch(deleteContactThunk(body));
  }, [user]);

  return (
    <>
      <div className='border-b border-border flex flex-col gap-y-3'>
        <DropdownListButton Icon={<viewProfile.Icon />} text={viewProfile.text} />
      </div>
      <div className='border-b border-border flex flex-col gap-y-3'>
        <DropdownListButton Icon={<audioCall.Icon />} text={audioCall.text} onClick={() => handleCallUser(false)} />
        <DropdownListButton Icon={<videoCall.Icon />} text={videoCall.text} onClick={() => handleCallUser(true)} />
        <DropdownListButton Icon={<sendMessage.Icon />} text={sendMessage.text} onClick={handleSendMessage} />
      </div>
      <div className='flex flex-col gap-y-3'>
        <DropdownListButton Icon={<remove.Icon />} text={remove.text} onClick={handleDeleteContact} />
        <DropdownListButton Icon={<report.Icon />} text={report.text} />
      </div>
    </>
  );
});
