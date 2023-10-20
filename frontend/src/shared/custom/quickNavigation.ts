import ChatIcon from '@mui/icons-material/Chat';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { Paths } from 'shared/routing';

export const quickNavigation = [
  {
    title: 'Quick Links',
    items: [
      {
        id: 0,
        href: Paths.chat,
        Icon: ChatIcon,
        text: 'Чаты',
      },
      {
        id: 1,
        href: Paths.contacts,
        Icon: PeopleAltIcon,
        text: 'Контакты',
      },
      {
        id: 2,
        href: Paths.stories,
        Icon: SwitchAccountIcon,
        text: 'Сторисы',
      },
    ],
  },
] as const;
