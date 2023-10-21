import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import CheckIcon from '@mui/icons-material/Check';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import UnarchiveOutlinedIcon from '@mui/icons-material/UnarchiveOutlined';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';

export type UserActionItemKeys = keyof typeof userActionItems;

export type UserActionItem = (typeof userActionItems)[UserActionItemKeys];

export const userActionItems = {
  sendMessage: {
    Icon: ChatBubbleOutlineOutlinedIcon,
    text: 'Отправить сообщение',
  },
  markAsRead: {
    Icon: CheckIcon,
    text: 'Пометить как прочитанное',
  },
  disableNotifications: {
    Icon: NotificationsNoneOutlinedIcon,
    text: 'Отключить оповещения',
  },
  viewProfile: {
    Icon: PersonOutlineOutlinedIcon,
    text: 'Посмотреть профиль',
  },
  audioCall: {
    Icon: LocalPhoneOutlinedIcon,
    text: 'Аудио звонок',
  },
  videoCall: {
    Icon: VideocamOutlinedIcon,
    text: 'Видео звонок',
  },
  saveToArchive: {
    Icon: UnarchiveOutlinedIcon,
    text: 'Сохранить в архиве',
  },
  remove: {
    Icon: DeleteOutlineOutlinedIcon,
    text: 'Удалить',
  },
  report: {
    Icon: ReportProblemOutlinedIcon,
    text: 'Пожаловаться',
  },
  block: {
    Icon: PersonOffOutlinedIcon,
    text: 'Заблокировать',
  },
};
