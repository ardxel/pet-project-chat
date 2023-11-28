import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { selectIsAuthorized } from 'entities/session';
import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'shared/model';
import { Paths } from 'shared/routing';
import { logoutThunk } from '../model/logout.thunk';

export const LogoutButton = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const dispatch = useAppDispatch();

  const onLogout = useCallback(() => {
    dispatch(logoutThunk());
  }, []);

  if (isAuthorized) {
    return (
      <ul className='flex'>
        <li>
          <Link
            to={Paths.login}
            onClick={onLogout}
            className='flex items-center gap-x-2 [&>*]:hover:text-active-link  [&>svg]:text-xl '>
            <PowerSettingsNewOutlinedIcon />
            <p>Выйти</p>
          </Link>
        </li>
      </ul>
    );
  }

  return null;
};
