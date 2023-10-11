import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

export const profileLinks = [
  {
    id: 0,
    icon: <PersonOutlineOutlinedIcon />,
    href: '/profile',
    text: 'Профиль',
  },
  {
    id: 1,
    icon: <SettingsOutlinedIcon />,
    href: '/settings',
    text: 'Настройки',
  },
  {
    id: 2,
    icon: <LockOpenOutlinedIcon />,
    href: '/profile/edit',
    text: 'Изменить пароль',
  },
];
