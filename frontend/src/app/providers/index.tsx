import { Suspense } from 'react';
import { Outlet } from 'react-router';
import { Header } from 'widgets';
import StoreProvider from './store.provider';

const Layout = () => (
  <>
    <StoreProvider>
      <Suspense fallback={<h1 className='text-red text-3xl'>Loading...</h1>}>
        <Header />
        <Outlet />
      </Suspense>
    </StoreProvider>
  </>
);

export default Layout;
