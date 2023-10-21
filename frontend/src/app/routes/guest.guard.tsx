import { selectIsAuthorized } from 'entities/session';
import { ReactElement } from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from 'shared/model';
import { Paths } from 'shared/routing';

function GuestGuardWrapper({ children }: { children: ReactElement }) {
  const isAuthorized = useAppSelector(selectIsAuthorized);

  if (!isAuthorized) return <Navigate to={Paths.login} />;

  return children;
}

export function withGuestGuard(Component: ReactElement) {
  return <GuestGuardWrapper>{Component}</GuestGuardWrapper>;
}
