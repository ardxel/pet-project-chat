import { selectOpenedChatId, selectOpenedChatMessages } from 'entities/chats';
import { messageUtil } from 'entities/message';
import { selectOpenSearchMessageBar } from 'entities/ui-visibility';
import { ChangeEvent, useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { useAppSelector } from 'shared/model';

export const useMessageNavigation = (onSelect: (index: number) => void) => {
  const openedChatId = useAppSelector(selectOpenedChatId);
  const messages = useAppSelector(selectOpenedChatMessages);
  const isOpen = useAppSelector(selectOpenSearchMessageBar);
  // const dispatch = useAppDispatch();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useLayoutEffect(() => {
    setSearchTerm('');
    setSelectedIndex(null);
  }, [openedChatId, isOpen]);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const matchedMessageIndexes = useMemo(() => {
    if (!searchTerm) return;
    const messageIndexes: number[] = [];
    messages.forEach((msg, index) => {
      const type = messageUtil.getType(msg);
      if (type === 'text' && msg.text.includes(searchTerm)) {
        messageIndexes.push(index);
      }
    });
    const lastIndex = messageIndexes.length - 1;
    setSelectedIndex(lastIndex);
    if (lastIndex >= 0) {
      onSelect(messageIndexes[lastIndex]);
      // dispatch(setSelectedMessageIndex(messageIndexes[lastIndex]));
    }
    return messageIndexes;
  }, [searchTerm, messages]);

  const messageIndexesCount = matchedMessageIndexes?.length || null;

  const increaseIndex = useCallback(() => {
    if (selectedIndex === null || !messageIndexesCount) return;
    const newIndex = selectedIndex + 1 > messageIndexesCount - 1 ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
    onSelect(matchedMessageIndexes[newIndex]);
    // dispatch(setSelectedMessageIndex(matchedMessageIndexes[newIndex]));
  }, [selectedIndex, messageIndexesCount, onSelect]);

  const decreaseIndex = useCallback(() => {
    if (selectedIndex === null || !messageIndexesCount) return;
    const newIndex = selectedIndex - 1 < 0 ? messageIndexesCount - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
    onSelect(matchedMessageIndexes[newIndex]);
    // dispatch(setSelectedMessageIndex(matchedMessageIndexes[newIndex]));
  }, [selectedIndex, messageIndexesCount, onSelect]);

  const displayCountEntries = useMemo(() => {
    const currentIndex = ('0' + (selectedIndex + 1)).slice(-2);
    const total = ('0' + messageIndexesCount).slice(-2);
    return messageIndexesCount > 0 ? `${currentIndex}/${total}` : '0/0';
  }, [selectedIndex, messageIndexesCount]);

  return {
    onDecrease: decreaseIndex,
    onIncrease: increaseIndex,
    uiCountImplementation: displayCountEntries,
    onSearch,
    searchValue: searchTerm,
  };
};
