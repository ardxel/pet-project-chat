import { selectIsAuthorized } from 'entities/session';
import { Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAppSelector } from 'shared/model';
import { Paths } from 'shared/routing';
import { Header } from 'widgets';

const Navigator = () => {
  const isAuthorized = useAppSelector(selectIsAuthorized);
  const location = useLocation();
  const isMainPage = location.pathname === '/';
  /* Главный path - это /chat */
  if (isAuthorized && isMainPage) return <Navigate replace to={Paths.chat} />;
  if (!isAuthorized && isMainPage) return <Navigate replace to={Paths.login} />;
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
