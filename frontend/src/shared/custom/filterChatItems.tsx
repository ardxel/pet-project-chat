import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import FolderDeleteOutlinedIcon from '@mui/icons-material/FolderDeleteOutlined';
import SentimentSatisfiedAltOutlinedIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';

export const filterChatItems = [
  {
    id: 0,
    text: 'Все чаты',
    Icon: TextsmsOutlinedIcon,
  },
  {
    id: 1,
    text: 'Активные',
    Icon: SentimentSatisfiedAltOutlinedIcon,
  },
  {
    id: 2,
    text: 'Архив',
    Icon: FolderDeleteOutlinedIcon,
  },
  {
    id: 3,
    text: 'Спам',
    Icon: TopicOutlinedIcon,
  },
  {
    id: 4,
    text: 'Корзина',
    Icon: DeleteForeverOutlinedIcon,
  },
];
