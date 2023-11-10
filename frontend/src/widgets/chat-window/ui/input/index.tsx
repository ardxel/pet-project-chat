import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import TagFacesOutlinedIcon from '@mui/icons-material/TagFacesOutlined';
import { IMessage, selectEditableMessage, selectOpenedChatId, setEditableMessage } from 'entities/chats';
import { selectUserId } from 'entities/session';
import { EmitCreateMessageBody, createMessageThunk } from 'features/message@create';
import { editMessageThunk } from 'features/message@edit';
import { KeyboardEvent, useEffect, useState } from 'react';
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

  useEffect(() => {
    if (editableMessage) {
      setText(editableMessage.text);
    }
  }, [editableMessage]);

  const handleCreate = () => {
    const messageBody: EmitCreateMessageBody = {
      sender: userId,
      conversationId,
      text,
    };

    if (text.length > 0) {
      dispatch(createMessageThunk(messageBody));
      setText('');
    }
  };

  const handleEdit = () => {
    if (editableMessage) {
      const { _id, conversationId } = editableMessage as IMessage;
      const messageBody = {
        conversationId,
        messageId: _id,
        text,
      };

      if (text.length > 0) {
        dispatch(editMessageThunk(messageBody));
        setText('');
      }
    }
  };

  const handleStopEdit = () => {
    dispatch(setEditableMessage(false));
    setText('');
  };

  const handleOnEnterDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (editableMessage) {
        handleEdit();
      } else {
        handleCreate();
      }
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
          onKeyDown={handleOnEnterDown}
          value={text}
          className='w-2/3 form-input border-none h-8 md:h-10 !bg-gray-200 dark:!bg-aside-bg flex-grow'
        />
        {editableMessage ? (
          <div className='flex gap-x-4'>
            <button onClick={handleStopEdit}>
              <IconWrapper className={iconWrapper}>
                <CloseIcon className={icon} />
              </IconWrapper>
            </button>
            <button onClick={handleEdit}>
              <IconWrapper className={iconWrapper}>
                <ModeEditOutlinedIcon className={icon} />
              </IconWrapper>
            </button>
          </div>
        ) : (
          <button onClick={handleCreate}>
            <IconWrapper className={iconWrapper}>
              <SendOutlinedIcon className={icon} />
            </IconWrapper>
          </button>
        )}
      </div>
    </div>
  );
};
