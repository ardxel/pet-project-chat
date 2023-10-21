import { persistedStore, store } from 'app/redux';
import { ThemeProvider } from 'entities/theme';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Provider as ReduxProvider } from 'react-redux';
import { RouterProvider } from 'react-router';
import { PersistGate } from 'redux-persist/integration/react';
import { BaseErrorPage } from 'shared/ui';
import router from './routes';
import './styles.css';

function bootstrap() {
  return createRoot(document.getElementById('root') as HTMLDivElement).render(
    <>
      <ErrorBoundary fallback={<BaseErrorPage />}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistedStore}>
            <ThemeProvider>
              <RouterProvider router={router} />
            </ThemeProvider>
          </PersistGate>
        </ReduxProvider>
      </ErrorBoundary>
    </>,
  );
}

bootstrap();
