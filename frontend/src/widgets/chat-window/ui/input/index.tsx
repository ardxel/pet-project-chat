import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';
import { selectEditableMessage, selectOpenedChatId, setEditableMessage } from 'entities/chats';
import { selectUserId } from 'entities/session';
import { updateUserStatusInChat } from 'features/chat/updateUserStatus';
import { createMessageThunk } from 'features/message/create';
import { editMessageThunk } from 'features/message/edit';
import { debounce } from 'lodash';
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { IconWrapper } from 'shared/ui';

const iconWrapper = 'w-8 h-8 md:w-10 md:h-10';
const icon = '!w-4 !h-4 md:!w-5 md:!h-5';

export const ChatInput = () => {
  const editableMessage = useAppSelector(selectEditableMessage);
  const conversationId = useAppSelector(selectOpenedChatId);
  const userId = useAppSelector(selectUserId);
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();
  const typingTimeout = useRef<NodeJS.Timeout>(null);

  useEffect(() => {
    if (editableMessage && editableMessage.text !== text) {
      setText(editableMessage.text);
    }
  }, [editableMessage]);

  const handleSubmit = useCallback(() => {
    if (!text.length) return;
    if (editableMessage) {
      const { _id, conversationId } = editableMessage;
      dispatch(editMessageThunk({ conversationId, messageId: _id, text }));
    } else {
      dispatch(createMessageThunk({ conversationId, text, sender: userId }));
    }

    setText('');
    clearTimeout(typingTimeout.current);
    dispatch(updateUserStatusInChat({ conversationId, status: 'online', userId }));
  }, [text]);

  const handleStopEdit = useCallback(() => {
    dispatch(setEditableMessage(false));
    setText('');
  }, []);

  const setTypingUserStatus = useCallback(
    debounce(() => {
      dispatch(updateUserStatusInChat({ conversationId, status: 'typing', userId }));
    }, 300),
    [conversationId, userId],
  );

  const handleOnKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      clearTimeout(typingTimeout.current);
      if (event.key !== 'Enter') {
        setTypingUserStatus();
        typingTimeout.current = setTimeout(() => {
          dispatch(updateUserStatusInChat({ conversationId, status: 'online', userId }));
        }, 5000);
      } else {
        handleSubmit();

        clearTimeout(typingTimeout.current);
        dispatch(updateUserStatusInChat({ conversationId, status: 'online', userId }));
      }
    },
    [handleSubmit],
  );

  return (
    <div className='w-full'>
      <div className='flex items-center gap-x-3 border-t border-border bg-bg px-4  py-5 md:gap-x-4 md:px-6 md:py-7'>
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
          onKeyDown={handleOnKeyDown}
          value={text}
          className='form-input h-8 w-2/3 flex-grow border-none !bg-gray-200 dark:!bg-aside-bg md:h-10'
        />
        {editableMessage ? (
          <div className='flex gap-x-4'>
            <button onClick={handleStopEdit}>
              <IconWrapper className={iconWrapper}>
                <CloseIcon className={icon} />
              </IconWrapper>
            </button>
            <button onClick={handleSubmit}>
              <IconWrapper className={iconWrapper}>
                <ModeEditOutlinedIcon className={icon} />
              </IconWrapper>
            </button>
          </div>
        ) : (
          <button onClick={handleSubmit}>
            <IconWrapper className={iconWrapper}>
              <SendOutlinedIcon className={icon} />
            </IconWrapper>
          </button>
        )}
      </div>
    </div>
  );
};
