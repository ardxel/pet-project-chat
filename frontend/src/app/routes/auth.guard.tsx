import { selectIsAuthorized } from 'entities/session';
import { ReactElement } from 'react';
import { Navigate } from 'react-router';
import { useAppSelector } from 'shared/model';
import { Paths } from 'shared/routing';

function AuthGuardWrapper({ children }: { children: ReactElement }) {
  const isAuthorized = useAppSelector(selectIsAuthorized);

  if (isAuthorized) return <Navigate to={Paths.home} />;

  return children;
}

export function withAuthGuard(Component: ReactElement) {
  return <AuthGuardWrapper>{Component}</AuthGuardWrapper>;
}
