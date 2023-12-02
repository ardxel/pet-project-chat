import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Paths } from 'shared/routing';
import { withAuthGuard } from './auth.guard';
import { withGuestGuard } from './guest.guard';
import { LayoutWithoutHeader, MainLayout } from './layouts';
import { NOT_FOUND } from './not-found';

const LoginPage = lazy(() => import('pages/login'));
const RegistrationPage = lazy(() => import('pages/register'));
const ChatPage = lazy(() => import('pages/chat'));
const ContactsPage = lazy(() => import('pages/contacts'));
const ProfilePage = lazy(() => import('pages/profile'));

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    path: Paths.home,
    children: [
      {
        path: Paths.chat,
        index: true,
        element: withGuestGuard(<ChatPage />),
      },
      {
        path: Paths.contacts,
        element: withGuestGuard(<ContactsPage />),
      },
      {
        path: Paths.profile,
        element: withGuestGuard(<ProfilePage />),
      },
      NOT_FOUND,
    ],
  },
  {
    element: <LayoutWithoutHeader />,
    children: [
      {
        path: Paths.login,
        element: withAuthGuard(<LoginPage />),
      },
      {
        path: Paths.registration,
        element: withAuthGuard(<RegistrationPage />),
      },
      NOT_FOUND,
    ],
  },
]);

export default router;
