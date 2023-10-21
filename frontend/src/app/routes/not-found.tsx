import { Navigate, RouteObject } from 'react-router';
import { Paths } from 'shared/routing';

export const NOT_FOUND: RouteObject = {
  path: Paths.band,
  element: <Navigate to={Paths.home} />,
};
