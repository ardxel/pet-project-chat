import { lazy } from 'react';
import { Navigate, Outlet, createBrowserRouter } from 'react-router-dom';
import { Paths } from 'shared/routing';
import { Header } from 'widgets';

const LoginPage = lazy(() => import('pages/login'));
const RegistrationPage = lazy(() => import('pages/register'));
const ChatPage = lazy(() => import('pages/chat'));

const router = createBrowserRouter([
  {
    path: Paths.home,
    element: (
      <>
        <Header />
        <Outlet />
      </>
    ),
    children: [
      {
        path: Paths.chat,
        element: <ChatPage />,
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
        path: Paths.band,
        element: <Navigate to={Paths.home} />,
      },
    ],
  },
  {
    path: Paths.home,
    children: [
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
        element: <Navigate to={Paths.home} />,
      },
    ],
  },
]);

export default router;
