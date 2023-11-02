import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseErrorPage } from '.';

function TestErrorComponent() {
  throw new Error('Test error');
  return null;
}

describe('Redirect on Base Error page', () => {
  let errorSpy;

  beforeEach(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  test('render error component when an error occurs', () => {
    render(
      <div>
        <ErrorBoundary fallback={<BaseErrorPage />}>
          <TestErrorComponent />
        </ErrorBoundary>
      </div>,
    );

    const errorAnchor = screen.getByTestId('error-redirect');

    expect(errorAnchor).toBeInTheDocument();

    expect(screen.getByText('Oos! Server Error')).toBeInTheDocument();
  });
});
