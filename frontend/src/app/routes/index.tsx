import Layout from 'app/providers';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { Paths } from 'shared/routing';

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
        path: Paths.band,
        element: redirectTo('/'),
      },
    ],
  },
]);

export default router;
