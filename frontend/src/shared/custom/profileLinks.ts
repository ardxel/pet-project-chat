import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Paths } from 'shared/routing';

export const profileLinks = [
  {
    id: 0,
    Icon: PersonOutlineOutlinedIcon,
    href: Paths.profile,
    text: 'Профиль',
  },
  {
    id: 1,
    Icon: SettingsOutlinedIcon,
    href: Paths.settings,
    text: 'Настройки',
  },
  {
    id: 2,
    Icon: LockOpenOutlinedIcon,
    href: '/profile/edit',
    text: 'Изменить пароль',
  },
];
