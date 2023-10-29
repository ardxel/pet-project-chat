import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';
import { selectOpenedChatId } from 'entities/chats';
import { selectUserId } from 'entities/session';
import { ResponseCreateMessageBody, fetchCreateMessage } from 'features/message@create';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { IconWrapper } from 'shared/ui';

const iconWrapper = 'w-8 h-8 md:w-10 md:h-10';
const icon = '!w-4 !h-4 md:!w-5 md:!h-5';

export const ChatInput = () => {
  const [text, setText] = useState('');
  const userId = useAppSelector(selectUserId);
  const conversationId = useAppSelector(selectOpenedChatId);
  const dispatch = useAppDispatch();

  const handleCreateMessage = () => {
    const messageBody: ResponseCreateMessageBody = {
      sender: userId,
      conversationId,
      text,
    };
    if (text.length > 0) {
      dispatch(fetchCreateMessage(messageBody));
      setText('');
    }
  };

  return (
    <div className='w-full'>
      <div className='bg-bg border-t border-border flex items-center px-4 py-5  md:px-6 md:py-7 gap-x-3 md:gap-x-4'>
        <div className='flex gap-x-5'>
          <button>
            <IconWrapper className={iconWrapper}>
              <AddOutlinedIcon className={icon} />
            </IconWrapper>
          </button>
          <button className='hidden xs2:block'>
            <IconWrapper className={iconWrapper}>
              <ImageOutlinedIcon className={icon} />
            </IconWrapper>
          </button>
          <button className='hidden xs2:flex'>
            <IconWrapper className={iconWrapper}>
              <TagFacesOutlinedIcon className={icon} />
            </IconWrapper>
          </button>
        </div>
        <input
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => (event.key === 'Enter' ? handleCreateMessage() : undefined)}
          value={text}
          className='w-2/3 form-input border-none h-8 md:h-10 !bg-gray-200 dark:!bg-aside-bg flex-grow'
        />
        <button onClick={handleCreateMessage}>
          <IconWrapper className={iconWrapper}>
            <SendOutlinedIcon className={icon} />
          </IconWrapper>
        </button>
      </div>
    </div>
  );
};
