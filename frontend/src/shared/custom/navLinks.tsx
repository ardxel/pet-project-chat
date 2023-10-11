import ChatIcon from '@mui/icons-material/Chat';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SwitchAccountIcon from '@mui/icons-material/SwitchAccount';
import { Paths } from 'shared/routing';

export const navLinks = [
  {
    id: 0,
    href: Paths.chat,
    icon: <ChatIcon />,
  },
  {
    id: 1,
    href: Paths.contacts,
    icon: <PeopleAltIcon />,
  },
  {
    id: 2,
    href: Paths.stories,
    icon: <SwitchAccountIcon />,
  },
] as const;
