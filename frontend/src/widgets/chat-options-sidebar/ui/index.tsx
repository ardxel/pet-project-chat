import { selectIsHiddenOptions, selectOpenedChatCompanion } from 'entities/chats';
import { useAppSelector } from 'shared/model';

export const ChatOptions = () => {
  const isHiddenOptions = useAppSelector(selectIsHiddenOptions);
  const chatCompanion = useAppSelector(selectOpenedChatCompanion);

  if (isHiddenOptions) return null;
  return (
    <aside className="'w-full h-full flex-shrink-0 md:w-80 1400:!w-[360px] bg-bg border-r border-border '">
      <div className='full h-1/6 bg-white'></div>
      <div>
        <div></div>
      </div>
    </aside>
  );
};
