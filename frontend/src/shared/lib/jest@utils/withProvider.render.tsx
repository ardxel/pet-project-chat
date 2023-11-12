import type { PreloadedState } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { buildStore } from 'app/redux';
import { ThemeProvider } from 'entities/theme';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, MemoryRouterProps } from 'react-router';
// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  memoryRouterOptions?: MemoryRouterProps;
  preloadedState?: PreloadedState<RootState>;
  store?: ReturnType<typeof configureStore> | RootState;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState,
    memoryRouterOptions,
    // Automatically create a store instance if no store was passed in
    store = buildStore() as any,
    ...renderOptions
  }: ExtendedRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren<any>): JSX.Element {
    return (
      <MemoryRouter {...memoryRouterOptions}>
        <Provider store={store}>
          <ThemeProvider>{children}</ThemeProvider>
        </Provider>
      </MemoryRouter>
    );
  }

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
