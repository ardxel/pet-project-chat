import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import { useCallsContext } from 'entities/calls';
import { useChatCompanionStatus } from 'entities/chatbarCard/lib';
import { selectOpenedChatCompanion } from 'entities/chats';
import {
  selectOpenChatOptions,
  selectOpenSearchMessageBar,
  setOpenChat,
  setOpenChatOptions,
  setOpenSearchMessageBar,
} from 'entities/ui-visibility';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { IconWrapper, UserAvatar } from 'shared/ui';
import { twMerge } from 'tailwind-merge';

const PhoneCallButton = memo(() => {
  const { _id, name } = useAppSelector(selectOpenedChatCompanion);
  const { callUser } = useCallsContext();
  return (
    <>
      <button onClick={() => callUser({ userId: _id, receiverName: name, isVideoCall: false })}>
        <IconWrapper className='header-chat-icon'>
          <PhoneIcon />
        </IconWrapper>
      </button>
    </>
  );
});

const VideoCallButton = memo(() => {
  const { _id, name } = useAppSelector(selectOpenedChatCompanion);
  const { callUser } = useCallsContext();
  return (
    <button onClick={() => callUser({ userId: _id, recieverName: name, isVideoCall: true })}>
      <IconWrapper className='header-chat-icon'>
        <VideocamIcon />
      </IconWrapper>
    </button>
  );
});

const SearchButton = memo(({ onClick }: { onClick: () => void }) => {
  return (
    <button onClick={onClick}>
      <IconWrapper className='header-chat-icon'>
        <SearchIcon />
      </IconWrapper>
    </button>
  );
});

const ChatOptionsButton = memo(({ onClick, focus }: { onClick: () => void; focus: boolean }) => {
  return (
    <button onClick={onClick}>
      <IconWrapper focus={focus} className={twMerge('header-chat-icon')}>
        <FormatAlignRightIcon />
      </IconWrapper>
    </button>
  );
});

export const ChatHeader = () => {
  const chatCompanion = useAppSelector(selectOpenedChatCompanion);
  const openChatOptions = useAppSelector(selectOpenChatOptions);
  const openSearchMessageBar = useAppSelector(selectOpenSearchMessageBar);
  const companionStatus = useChatCompanionStatus();
  const dispatch = useAppDispatch();

  if (!chatCompanion) return null;

  const hasFullname = Boolean(chatCompanion.firstName && chatCompanion.lastName);

  const handleOpenChatOptions = () => {
    dispatch(setOpenChatOptions(!openChatOptions));
  };

  const handleCloseChat = () => {
    dispatch(setOpenChat(false));
  };

  const toggleSearchMessageBar = () => {
    dispatch(setOpenSearchMessageBar(!openSearchMessageBar));
  };

  return (
    <div>
      <div className='p-5 bg-bg border-b border-border'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-x-4 items-center'>
            <button onClick={handleCloseChat} className='md:hidden'>
              <IconWrapper className='header-chat-icon !rounded-full'>
                <ChevronLeftIcon />
              </IconWrapper>
            </button>
            <div className='relative w-[50px] h-[50px]'>
              <UserAvatar user={chatCompanion} className='w-full h-full' />
            </div>
            <div>
              <div className='flex items-center h-full'>
                <h4 className='text-left text-sm'>
                  {hasFullname ? chatCompanion.firstName + ' ' + chatCompanion.lastName : chatCompanion.name}
                </h4>
              </div>
              <div>
                <p className='text-xs text-gray-400 dark:text-gray-500 mt-1'>{companionStatus}</p>
              </div>
            </div>
          </div>
          <div className='flex gap-x-4'>
            <PhoneCallButton />
            <VideoCallButton />
            <SearchButton onClick={toggleSearchMessageBar} />
            <ChatOptionsButton onClick={handleOpenChatOptions} focus={openChatOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};
