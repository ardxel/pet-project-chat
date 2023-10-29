import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import PhoneIcon from '@mui/icons-material/Phone';
import SearchIcon from '@mui/icons-material/Search';
import VideocamIcon from '@mui/icons-material/Videocam';
import { selectOpenedChatCompanion, setIsHiddenChat } from 'entities/chats';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { AvatartByFirstLetter, IconWrapper } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
export const ChatHeader = () => {
  const chatCompanion = useAppSelector(selectOpenedChatCompanion);
  const dispatch = useAppDispatch();

  if (!chatCompanion) return null;

  const hasAvatar = Boolean(chatCompanion.avatar);
  const hasFullname = Boolean(chatCompanion.firstName && chatCompanion.lastName);

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
              {hasAvatar ? (
                <img
                  className={twMerge('rounded-md object-cover overflow-hidden', 'absolute w-full h-full')}
                  src={chatCompanion.avatar}
                />
              ) : (
                <AvatartByFirstLetter name={chatCompanion.name} />
              )}
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
            <button>
              <IconWrapper className='header-chat-icon'>
                <PhoneIcon />
              </IconWrapper>
            </button>
            <button>
              <IconWrapper className='header-chat-icon'>
                <VideocamIcon />
              </IconWrapper>
            </button>
            <button>
              <IconWrapper className='header-chat-icon'>
                <SearchIcon />
              </IconWrapper>
            </button>
            <button>
              <IconWrapper className='header-chat-icon'>
                <FormatAlignRightIcon />
              </IconWrapper>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
