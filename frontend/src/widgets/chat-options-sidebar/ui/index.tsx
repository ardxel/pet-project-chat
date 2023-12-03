import { selectOpenedChatCompanion } from 'entities/chats';
import { userUtils } from 'entities/session';
import { selectOpenChatOptions, setOpenChatOptions } from 'entities/ui-visibility';
import { useChatCompanionStatus } from 'features/chatBarCard/lib';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { UserAvatar } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { MediaButton, MediaContainer } from './media';
import { MuteButton } from './muteModal';
import { OptionsButton, OptionsContainer } from './options';

const ChatOptions = () => {
  const openChatOptions = useAppSelector(selectOpenChatOptions);
  const chatCompanion = useAppSelector(selectOpenedChatCompanion);
  const { status: companionStatus } = useChatCompanionStatus();
  const [selected, setSelected] = useState<'media' | 'options'>('media');
  const dispatch = useAppDispatch();

  if (!openChatOptions) return null;

  const username = userUtils.getName(chatCompanion);

  const closeChatOptions = () => {
    dispatch(setOpenChatOptions(false));
  };

  const openOptionMenu = (value: typeof selected) => {
    setSelected(value);
  };

  return (
    <>
      <aside
        className={twMerge(
          'z-[900] flex h-full w-80 flex-shrink-0 flex-col border-l border-border bg-bg 1400:!w-[360px]',
          'absolute right-0 xl:relative',
        )}>
        <div className='full h-1/6 bg-transparent'></div>
        <div className='w-full'>
          <UserAvatar user={chatCompanion} className='mx-auto h-14 w-14 rounded-md' />
          <h4 className='mt-3 w-full text-center'>{username}</h4>
          <p className='mt-2 h-2 w-full text-center text-xs text-gray-400 dark:text-gray-500'>{companionStatus}</p>
        </div>
        <div className='mx-5 flex justify-between'>
          <MuteButton />
          <MediaButton focus={selected === 'media'} onClick={() => openOptionMenu('media')} />
          <OptionsButton focus={selected === 'options'} onClick={() => openOptionMenu('options')} />
        </div>
        <div className='mx-5 mt-4'>
          {selected === 'media' ? <MediaContainer /> : null}
          {selected === 'options' ? <OptionsContainer /> : null}
        </div>
      </aside>
      {openChatOptions && (
        <div
          className='absolute left-0 z-[900] h-full w-[calc(100%-320px)] bg-black bg-opacity-50 1400:w-[calc(100%-360px)] xl:hidden'
          onClick={closeChatOptions}></div>
      )}
    </>
  );
};

export default ChatOptions;
