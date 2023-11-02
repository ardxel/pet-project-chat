import type { PreloadedState } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { AppStore } from 'app/redux';
import { rootReducer } from 'app/redux/root.reducer';
import { initialChatsState } from 'entities/chats';
import { initialContactsState } from 'entities/contacts';
import { initialSessionState } from 'entities/session';
import { initialThemeState } from 'entities/theme';
import { invalidateAccessTokenListener } from 'features/auth/invalidateAccessToken';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, MemoryRouterProps } from 'react-router';
import { baseApi } from 'shared/api';
// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  memoryRouterOptions?: MemoryRouterProps;
  preloadedState?: PreloadedState<RootState>;
  store?: ReturnType<typeof configureStore> | AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {
      session: initialSessionState,
      chats: initialChatsState,
      contacts: initialContactsState,
      theme: initialThemeState,
    },
    memoryRouterOptions,
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      preloadedState: preloadedState,
      reducer: rootReducer,
      middleware: (getDefailtMiddleware) =>
        getDefailtMiddleware({
          serializableCheck: {
            // ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(baseApi.middleware, invalidateAccessTokenListener.middleware),
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<any>): JSX.Element {
    return;
    <MemoryRouter {...memoryRouterOptions}>
      <Provider store={store}>{children}</Provider>
    </MemoryRouter>;
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
