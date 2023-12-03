import { selectIsAuthorized } from 'entities/session';
import { Suspense } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import { ScaleLoader } from 'react-spinners';
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
      <Suspense
        fallback={
          <div className='absolute left-0 right-0 top-0 flex h-full w-full items-center justify-center'>
            <ScaleLoader className='w-30 h-30 [&>span]:!bg-blue-500' />
          </div>
        }>
        <Navigator />
        <Outlet />
      </Suspense>
    </>
  );
};

const LayoutWithoutHeader = () => {
  return (
    <>
      <Suspense
        fallback={
          <div className='absolute left-0 right-0 top-0 flex h-full w-full items-center justify-center'>
            <ScaleLoader className='w-30 h-30 [&>span]:!bg-blue-500' />
          </div>
        }>
        <Navigator />
        <Outlet />
      </Suspense>
    </>
  );
};

export { LayoutWithoutHeader, MainLayout };
