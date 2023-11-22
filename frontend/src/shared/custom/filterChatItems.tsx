import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DomainVerificationOutlinedIcon from '@mui/icons-material/DomainVerificationOutlined';
import FolderDeleteOutlinedIcon from '@mui/icons-material/FolderDeleteOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';

export const filterChatItems = [
  {
    id: 0,
    label: 'Все чаты',
    text: 'allChats',
    Icon: TextsmsOutlinedIcon,
  },
  {
    id: 1,
    label: 'Основные',
    text: 'general',
    Icon: DomainVerificationOutlinedIcon,
  },
  {
    id: 2,
    label: 'Активные',
    text: 'active',
    Icon: SentimentSatisfiedAltOutlinedIcon,
  },
  {
    id: 3,
    label: 'Архив',
    text: 'archive',
    Icon: FolderDeleteOutlinedIcon,
  },
  {
    id: 4,
    label: 'Спам',
    text: 'spam',
    Icon: TopicOutlinedIcon,
  },
  {
    id: 5,
    label: 'Корзина',
    text: 'trash',
    Icon: DeleteForeverOutlinedIcon,
  },
];
