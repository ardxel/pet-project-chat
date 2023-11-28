import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import { useCallsContext } from 'entities/calls';
import { selectOpenedChatCompanion, selectOpenedChatId, setOpenedChatId } from 'entities/chats';
import { userUtils } from 'entities/session';
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
  const chatId = useAppSelector(selectOpenedChatId);
  const chatCompanion = useAppSelector(selectOpenedChatCompanion);
  const openChatOptions = useAppSelector(selectOpenChatOptions);
  const openSearchMessageBar = useAppSelector(selectOpenSearchMessageBar);
  const companionStatus = useChatCompanionStatus();
  const dispatch = useAppDispatch();

  if (!chatCompanion) return null;

  const username = userUtils.getName(chatCompanion);

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
          <div className='flex items-center gap-x-4'>
            <button onClick={handleCloseChat} className='md:hidden'>
              <IconWrapper className='header-chat-icon !rounded-full'>
                <ChevronLeftIcon />
              </IconWrapper>
            </button>
            <div className='relative h-[50px] w-[50px]'>
              <UserAvatar user={chatCompanion} className='h-full w-full' />
            </div>
            <div>
              <div className='flex h-full items-center'>
                <h4 className='text-left text-sm'>{username}</h4>
              </div>
              <div>
                <p className='mt-1 text-xs text-gray-400 dark:text-gray-500'>{companionStatus}</p>
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
