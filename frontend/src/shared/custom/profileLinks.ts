import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const profileLinks = [
  {
    id: 0,
    Icon: PersonOutlineOutlinedIcon,
    href: '/profile',
    text: 'Профиль',
  },
  {
    id: 1,
    Icon: SettingsOutlinedIcon,
    href: '/settings',
    text: 'Настройки',
  },
  {
    id: 2,
    Icon: LockOpenOutlinedIcon,
    href: '/profile/edit',
    text: 'Изменить пароль',
  },
];
