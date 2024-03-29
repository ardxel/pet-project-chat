import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import { useCallsContext } from 'entities/calls';
import { selectOpenedChatCompanion, setOpenedChatId } from 'entities/chats';
import {
  selectOpenChatOptions,
  selectOpenSearchMessageBar,
  setOpenChat,
  setOpenChatOptions,
  setOpenSearchMessageBar,
} from 'entities/ui-visibility';
import { useChatCompanionStatus } from 'features/chatBarCard/lib';
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
    <button onClick={() => callUser({ userId: _id, receiverName: name, isVideoCall: true })}>
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
  const { status: companionStatus } = useChatCompanionStatus();
  const dispatch = useAppDispatch();

  if (!chatCompanion) return null;

  const companionName = chatCompanion?.firstName || chatCompanion?.name;

  const handleOpenChatOptions = () => {
    dispatch(setOpenChatOptions(!openChatOptions));
  };

  const handleCloseChat = () => {
    dispatch(setOpenedChatId(null));
    dispatch(setOpenChat(false));
  };

  const toggleSearchMessageBar = () => {
    dispatch(setOpenSearchMessageBar(!openSearchMessageBar));
  };
  return (
    <div>
      <div className='border-b border-border bg-bg p-5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-x-2 xs2:gap-x-4'>
            <button onClick={handleCloseChat} className='md:hidden'>
              <IconWrapper className='header-chat-icon !rounded-full'>
                <ChevronLeftIcon />
              </IconWrapper>
            </button>
            <div className='relative h-[40px] w-[40px] xs2:h-[50px] xs2:w-[50px]'>
              <UserAvatar user={chatCompanion} className='h-full w-full rounded-md' />
            </div>
            <div>
              <div className='flex h-full items-center'>
                <h4 className='text-left text-sm font-semibold xs2:text-base'>{companionName}</h4>
              </div>
              <div className='h-4'>
                <p className='text-xs leading-4 text-gray-400 dark:text-gray-500'>{companionStatus || 'offline'}</p>
              </div>
            </div>
          </div>
          <div className='flex gap-x-2 xs2:gap-x-4'>
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
