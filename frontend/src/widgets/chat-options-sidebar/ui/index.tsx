import { useChatCompanionStatus } from 'entities/chatbarCard/lib';
import { selectOpenedChatCompanion } from 'entities/chats';
import { selectOpenChatOptions, setOpenChatOptions } from 'entities/ui-visibility';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { UserAvatar } from 'shared/ui';
import { twMerge } from 'tailwind-merge';
import { MediaButton, MediaContainer } from './media';
import { MuteButton } from './muteModal';
import { OptionsButton, OptionsContainer } from './options';

export const ChatOptions = () => {
  const openChatOptions = useAppSelector(selectOpenChatOptions);
  const chatCompanion = useAppSelector(selectOpenedChatCompanion);
  const chatCompanionStatus = useChatCompanionStatus();
  const [selected, setSelected] = useState<'media' | 'options'>('media');
  const dispatch = useAppDispatch();

  if (!openChatOptions) return null;
  const hasFullname = Boolean(chatCompanion.firstName && chatCompanion.lastName);

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
          'h-full border-l border-border flex flex-col flex-shrink-0 w-80 1400:!w-[360px] bg-bg z-[900]',
          'absolute right-0 xl:relative',
        )}>
        <div className='full h-1/6 bg-transparent'></div>
        <div className='w-full'>
          <UserAvatar user={chatCompanion} className='w-14 h-14 mx-auto' />
          <h4 className='w-full text-center mt-3'>
            {hasFullname ? chatCompanion.firstName + ' ' + chatCompanion.lastName : chatCompanion.name}
          </h4>
          <p className='w-full text-center mt-2 text-xs h-2 text-gray-400 dark:text-gray-500'>{chatCompanionStatus}</p>
        </div>
        <div className='flex justify-between mx-5'>
          <MuteButton />
          <MediaButton onClick={() => openOptionMenu('media')} />
          <OptionsButton onClick={() => openOptionMenu('options')} />
        </div>
        <div className='mx-5 mt-4'>
          {selected === 'media' ? <MediaContainer /> : null}
          {selected === 'options' ? <OptionsContainer /> : null}
        </div>
      </aside>
      {openChatOptions && (
        <div
          className='w-[calc(100%-320px)] xl:hidden 1400:w-[calc(100%-360px)] h-full z-[900] absolute left-0 bg-opacity-50 bg-black'
          onClick={closeChatOptions}></div>
      )}
    </>
  );
};
