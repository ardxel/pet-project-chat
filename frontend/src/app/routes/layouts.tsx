import { selectIsAuthorized } from 'entities/session';
import { Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAppSelector } from 'shared/model';
import { Paths } from 'shared/routing';
import { Header } from 'widgets';

const Navigator = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const location = useLocation();
  /* Главный path - это /chat */
  if (isAuthorized && location.pathname === '/') return <Navigate replace to={Paths.chat} />;
  else return null;
};

const MainLayout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<h1 className='text-3xl'>Loading...</h1>}>
        <Navigator />
        <Outlet />
      </Suspense>
    </>
  );
};

const LayoutWithoutHeader = () => {
  return (
    <>
      <Suspense fallback={<h1 className='text-3xl'>Loading...</h1>}>
        <Navigator />
        <Outlet />
      </Suspense>
    </>
  );
};

export { LayoutWithoutHeader, MainLayout };
