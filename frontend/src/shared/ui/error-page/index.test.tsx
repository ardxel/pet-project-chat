import { render, screen } from '@testing-library/react';
import { useEffect } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BaseErrorPage } from '.';

function ErrorPage(): null {
  useEffect(() => {
    throw new Error();
  });
  return null;
}

describe('Redirect on Base Error page', () => {
  test('render error component when an error occurs', () => {
    render(
      <ErrorBoundary fallback={<BaseErrorPage />}>
        <ErrorPage />
      </ErrorBoundary>,
    );

    const errorAnchor = screen.getByTestId('error-redirect');
    expect(errorAnchor).toBeInTheDocument();
  });
});
