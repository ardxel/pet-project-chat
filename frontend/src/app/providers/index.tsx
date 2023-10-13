import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Outlet } from 'react-router';
import { BaseErrorPage } from 'shared/ui';
import { Header } from 'widgets';
import StoreProvider from './store.provider';

const Layout = () => (
  <>
    <ErrorBoundary fallback={<BaseErrorPage />}>
      <StoreProvider>
        <Suspense fallback={<h1 className='text-red text-3xl'>Loading...</h1>}>
          <Header />
          <Outlet />
        </Suspense>
      </StoreProvider>
    </ErrorBoundary>
  </>
);

export default Layout;
