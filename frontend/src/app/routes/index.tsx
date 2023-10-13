import Layout from 'app/providers';
import { lazy, useEffect } from 'react';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Paths } from 'shared/routing';

const LoginPage = lazy(() => import('pages/login'));
const RegistrationPage = lazy(() => import('pages/register'));

const redirectTo = (path: string) => <Navigate to={path} />;

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: <Layout />,
    children: [
      {
        path: Paths.chat,
        element: <div></div>,
      },
      {
        path: Paths.contacts,
        element: <div></div>,
      },
      {
        path: Paths.stories,
        element: <div></div>,
      },
      {
        path: '/123',
        element: <BuggyComponent />,
      },
      {
        path: Paths.login,
        element: <LoginPage />,
      },
      {
        path: Paths.registration,
        element: <RegistrationPage />,
      },
      {
        path: Paths.band,
        element: redirectTo('/'),
      },
    ],
  },
]);

export default router;
function BuggyComponent() {
  useEffect(() => {
    throw new Error('JOPA');
  });
  return <div>Hello world</div>;
}
