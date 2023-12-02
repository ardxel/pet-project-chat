import { Menu, Switch } from '@headlessui/react';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { selectUserData, userUtils } from 'entities/session';
import { changeTheme, selectCurrentTheme } from 'entities/theme';
import { LogoutButton } from 'features/auth/logout';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { profileLinks } from 'shared/custom';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { DropdownListItem, UserAvatar } from 'shared/ui';

const ProfileTitle = () => {
  const user = useAppSelector(selectUserData);

  return (
    <div className='flex items-center gap-x-2'>
      <div className='h-10 w-10'>
        <UserAvatar user={user} className='h-full w-full rounded-md' />
      </div>
      <div>
        <h5 className='text-sm'>{userUtils.getName(user)}</h5>
        {user.about && <p>{user.about?.substring(0, 25)}</p>}
      </div>
    </div>
  );
};

const ProfileDarkModeSwitcher = () => {
  const theme = useAppSelector(selectCurrentTheme);
  const enabledDarkTheme = theme === 'dark';
  const dispatch = useAppDispatch();

  const switchTheme = useCallback(() => {
    dispatch(changeTheme(enabledDarkTheme ? 'light' : 'dark'));
  }, [theme]);

  return (
    <div className='flex gap-x-1'>
      <DarkModeIcon className='align-middle' />
      <div className=' ml-1'>
        <h3 className='mb-1 text-base font-semibold leading-6'>Dark mode</h3>
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

const [toProfile, toSettings, toChangePassword] = profileLinks;

const ProfileLinks = () => {
  return (
    <ul className='flex flex-col gap-y-2'>
      <li>
        <Link to={toProfile.href} state={{ editProfileMain: false }}>
          <DropdownListItem Icon={<toProfile.Icon />} text={toProfile.text} />
        </Link>
      </li>
      <li>
        <Link to={toSettings.href} state={{ editProfileMain: true }}>
          <DropdownListItem Icon={<toSettings.Icon />} text={toSettings.text} />
        </Link>
      </li>
      <li>
        <Link to={toChangePassword.href} state={{ passwordTab: true }}>
          <DropdownListItem Icon={<toChangePassword.Icon />} text={toChangePassword.text} />
        </Link>
      </li>
    </ul>
  );
};

const HeaderProfile = () => {
  const user = useAppSelector(selectUserData);
  return (
    <Menu as='div' className='dropdown'>
      <Menu.Button className='relative flex h-11 w-11 items-center justify-center md:h-12 md:w-12'>
        <UserAvatar user={user} className='h-full w-full rounded-full' />
      </Menu.Button>
      <Menu.Items
        as='div'
        className='dropdown-menu w-60 bg-bg [&>*:last-child]:border-t [&>*:last-child]:border-border [&>div]:p-4'>
        <Menu.Item as='div' className='border-b border-border'>
          <ProfileTitle />
        </Menu.Item>
        <Menu.Item as='div' className='border-b border-border'>
          <ProfileDarkModeSwitcher />
        </Menu.Item>
        <Menu.Item as='div'>
          <ProfileLinks />
        </Menu.Item>
        <Menu.Item as='div'>
          <LogoutButton />
        </Menu.Item>
      </Menu.Items>
    </Menu>
  );
};
export default HeaderProfile;
