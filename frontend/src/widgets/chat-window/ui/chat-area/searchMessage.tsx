import CloseIcon from '@mui/icons-material/Close';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { selectOpenedChatId, selectOpenedChatMessages } from 'entities/chats';
import { selectOpenSearchMessageBar, setOpenSearchMessageBar } from 'entities/ui-visibility';
import { ChangeEvent, Dispatch, FC, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { IconWrapper, SearchInput } from 'shared/ui';
import { twMerge } from 'tailwind-merge';

interface SearchMessageBarProps
  extends FC<{
    onSelectedIndex: Dispatch<SetStateAction<number>>;
  }> {}

export const SearchMessageBar: SearchMessageBarProps = ({ onSelectedIndex }) => {
  const openedChatId = useAppSelector(selectOpenedChatId);
  const messages = useAppSelector(selectOpenedChatMessages);
  const isOpen = useAppSelector(selectOpenSearchMessageBar);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const dispatch = useAppDispatch();
  useEffect(() => {
    setSearchTerm('');
    setSelectedIndex(null);
  }, [openedChatId, isOpen]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const matchedMessageIndexes = useMemo(() => {
    if (!searchTerm) return;
    const messageIndexes: number[] = [];
    for (let i = 0; i <= messages.length - 1; i++) {
      if (messages[i].text.includes(searchTerm)) {
        messageIndexes.push(i);
      }
    }
    setSelectedIndex(messageIndexes.length - 1);
    return messageIndexes;
  }, [searchTerm, messages]);

  const messageIndexesCount = matchedMessageIndexes?.length || null;

  const increaseIndex = useCallback(() => {
    if (selectedIndex === null) return;
    if (selectedIndex + 1 > messageIndexesCount - 1) {
      setSelectedIndex(0);
    } else {
      setSelectedIndex(selectedIndex + 1);
    }

    onSelectedIndex(matchedMessageIndexes[selectedIndex + 1 > messageIndexesCount - 1 ? 0 : selectedIndex + 1]);
  }, [selectedIndex, messageIndexesCount]);

  const decreaseIndex = useCallback(() => {
    if (selectedIndex === null) return;
    if (selectedIndex - 1 < 0) {
      setSelectedIndex(messageIndexesCount - 1);
    } else {
      setSelectedIndex(selectedIndex - 1);
    }
    onSelectedIndex(matchedMessageIndexes[selectedIndex - 1 < 0 ? messageIndexesCount - 1 : selectedIndex - 1]);
  }, [selectedIndex, messageIndexesCount]);

  const displayedIndex = selectedIndex + 1 < 10 ? '0' + (selectedIndex + 1) : selectedIndex + 1;
  const countEntries = messageIndexesCount > 0 ? displayedIndex + '/' + messageIndexesCount : 0;
  const displayCountEntries = searchTerm.length > 0 ? countEntries : null;

  return (
    <div
      className={twMerge(
        `absolute w-full top-0 z-[999] bg-bg border-border border-b transition-all duration-500 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`,
      )}>
      <div className='w-full h-full px-4 flex items-center p-1 '>
        <SearchInput
          value={searchTerm}
          onChange={handleSearch}
          wrapperClassName='w-full h-full [&>svg]:w-6 [&>svg]:h-6'
          placeholder='Искать в этом чате'
          className='rounded-md pl-12 w-full border-none dark:focus:bg-bg bg-bg focus:bg-bg h-full'
        />
        <div className='min-w-16 w-16 max-w-[50px] h-9 flex justify-center items-center rounded-md border border-border mr-2'>
          <p>{displayCountEntries}</p>
        </div>
        <div className='flex items-center'>
          <button onClick={decreaseIndex}>
            <IconWrapper className='w-8 h-8 bg-transparent hover:bg-icon-active-bg rounded-md'>
              <ExpandLessIcon className='!w-6 !h-6' />
            </IconWrapper>
          </button>
          <button onClick={increaseIndex}>
            <IconWrapper className='w-8 h-8 bg-transparent hover:bg-icon-active-bg rounded-md'>
              <ExpandMoreIcon className='!w-6 !h-6' />
            </IconWrapper>
          </button>
        </div>
        <button className='ml-2' onClick={() => dispatch(setOpenSearchMessageBar(false))}>
          <IconWrapper className='w-9 h-9 rounded-md'>
            <CloseIcon className='!w-6 !h-6' />
          </IconWrapper>
        </button>
      </div>
    </div>
  );
};
