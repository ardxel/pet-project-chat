import { Menu, Switch } from '@headlessui/react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { profileLinks } from 'shared/custom';
import { twMerge } from 'tailwind-merge';

const ProfileTitle = () => {
  return (
    <div className='flex items-center gap-x-2'>
      <div>
        <img src='https://connectme-html.themeyn.com/images/avatar/3.jpg' className='rounded-xl w-12 h-12' />
      </div>
      <div>
        <h5 className='text-sm'>Vasily Bobnev</h5>
        <p>description</p>
      </div>
    </div>
  );
};

const ProfileDarkModeSwitcher = () => {
  const [enabledDarkTheme, setenabledDarkTheme] = useState(localStorage.theme === 'dark');

  const switchTheme = () => {
    if (enabledDarkTheme) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setenabledDarkTheme(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setenabledDarkTheme(true);
    }
  };

  return (
    <div className='flex gap-x-1'>
      <DarkModeIcon className='align-middle' />
      <div className=' ml-1'>
        <h3 className='leading-6 text-base mb-1'>Darkmode</h3>
        <Switch
          checked={enabledDarkTheme}
          onChange={switchTheme}
          className={`${
            enabledDarkTheme ? 'bg-blue-600' : 'bg-gray-200'
          } relative inline-flex h-6 w-14 items-center rounded-full`}>
          <span
            className={`${
              enabledDarkTheme ? 'translate-x-9' : 'translate-x-1'
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
      </div>
    </div>
  );
};

const ProfileLinks = () => {
  return (
    <ul className='flex flex-col gap-y-2'>
      {profileLinks.map((link) => (
        <li key={link.href}>
          <Link to={link.href} className='flex items-center gap-x-2 [&>svg]:text-xl  [&>*]:hover:text-active-link '>
            {link.icon}
            <p>{link.text}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

const HeaderProfile = () => {
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <Menu as='div' className='dropdown'>
      <Menu.Button className='w-11 h-11 md:w-12 md:h-12 relative'>
        <img
          className={twMerge(
            'absolute top-1/2 z-50 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
            'rounded-full object-cover overflow-hidden',
          )}
          src='https://connectme-html.themeyn.com/images/avatar/3.jpg'
        />
      </Menu.Button>
      <Menu.Items as='div' className='dropdown-menu w-60 bg-bg [&>div]:p-4'>
        <Menu.Item as='div' className='border-b border-border'>
          <ProfileTitle />
        </Menu.Item>
        <Menu.Item as='div' className='border-b border-border'>
          <ProfileDarkModeSwitcher />
        </Menu.Item>
        <Menu.Item as='div'>
          <ProfileLinks />
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
export default HeaderProfile;
