import {
  selectConversationIdAndCompanionListSorted,
  selectPrivateChatsExist,
  selectSearchChatInput,
} from 'entities/chats';
import { userUtils } from 'entities/session';
import { selectChatBarFilterOption } from 'entities/ui-visibility';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAppSelector } from 'shared/model';

export const useFilterChats = () => {
  const chats = useAppSelector(selectConversationIdAndCompanionListSorted);
  const chatsIsLoaded = useAppSelector(selectPrivateChatsExist);
  const searchChatInput = useSelector(selectSearchChatInput);
  const filterOptions = useAppSelector(selectChatBarFilterOption);

  const filteredChatsByFilterOptions = useMemo(() => {
    switch (filterOptions) {
      case 'allChats':
        return chats;
      case 'active':
        return chats.filter((chat) => chat.companionStatus === 'online' || chat.companionStatus === 'typing');
      case 'general':
        return chats.filter((chat) => chat.chatStatus === 'common');
      case 'archive':
        return chats.filter((chat) => chat.chatStatus === 'archived');
      case 'trash':
        return chats.filter((chat) => chat.chatStatus === 'trash');
      default:
        return chats.filter((chat) => chat.chatStatus === filterOptions);
    }
  }, [filterOptions, chats]);

  const filteredChatsBySearchInput = useMemo(() => {
    if (!searchChatInput.length) return filteredChatsByFilterOptions;

    const inputLower = searchChatInput.toLowerCase();

    return filteredChatsByFilterOptions.filter((chat) => {
      const {
        companion: { firstName, lastName, name },
      } = chat;
      const nameLower = name.toLowerCase();
      const hasFullname = userUtils.hasFullname(chat.companion);
      const fullnameLower = hasFullname ? (firstName + lastName).toLowerCase() : null;

      return nameLower.includes(inputLower) || (hasFullname && fullnameLower.includes(inputLower));
    });
  }, [chats, searchChatInput, filteredChatsByFilterOptions]);

  return chatsIsLoaded ? filteredChatsBySearchInput : undefined;
};
