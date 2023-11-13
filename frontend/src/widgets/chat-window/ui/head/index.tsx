import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import { selectIsHiddenOptions, selectOpenedChatCompanion, setIsHiddenChat, setIsHiddenOptions } from 'entities/chats';
import { memo } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { IconWrapper, UserAvatar } from 'shared/ui';
import { twMerge } from 'tailwind-merge';

const PhoneCallButton = memo(() => {
  return (
    <button>
      <IconWrapper className='header-chat-icon'>
        <PhoneIcon />
      </IconWrapper>
    </button>
  );
});

const VideoCallButton = memo(() => {
  return (
    <button>
      <IconWrapper className='header-chat-icon'>
        <VideocamIcon />
      </IconWrapper>
    </button>
  );
});

const SearchButton = memo(() => {
  return (
    <button>
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
  const isHiddeOptions = useAppSelector(selectIsHiddenOptions);
  const dispatch = useAppDispatch();

  if (!chatCompanion) return null;

  const hasFullname = Boolean(chatCompanion.firstName && chatCompanion.lastName);

  const handleOpenChatOptions = () => {
    dispatch(setIsHiddenOptions(!isHiddeOptions));
  };

  return (
    <div>
      <div className='p-5 bg-bg border-b border-border'>
        <div className='flex items-center justify-between'>
          <div className='flex gap-x-4 items-center'>
            <button onClick={() => dispatch(setIsHiddenChat(true))} className='md:hidden'>
              <IconWrapper className='header-chat-icon !rounded-full'>
                <ChevronLeftIcon />
              </IconWrapper>
            </button>
            <div className='relative w-[50px] h-[50px]'>
              <UserAvatar user={chatCompanion} />
            </div>
            <div>
              {hasFullname ? (
                <>
                  <h4 className='text-left text-sm'>{`${chatCompanion.firstName} ${chatCompanion.lastName}`}</h4>{' '}
                  <p className='text-xs mt-1'>{chatCompanion.name}</p>{' '}
                </>
              ) : (
                <div className='flex items-center h-full'>
                  <h4 className='text-left text-sm'>{chatCompanion.name}</h4>
                </div>
              )}
            </div>
          </div>
          <div className='flex gap-x-4'>
            <PhoneCallButton />
            <VideoCallButton />
            <SearchButton />
            <ChatOptionsButton onClick={handleOpenChatOptions} focus={!isHiddeOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};
