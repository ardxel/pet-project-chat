import { screen } from '@testing-library/react';
import { renderWithProviders } from 'shared/lib';
import { AvatartByFirstLetter } from '.';

describe('Test FirstLetterAvatar component', () => {
  const name1 = 'john';
  const name2 = 'alice';
  test('loading and displays first letter', async () => {
    const { rerender } = renderWithProviders(<AvatartByFirstLetter name={name1} />);

    await screen.findByRole('heading');

    expect(screen.getByRole('heading')).toHaveTextContent(new RegExp(name1[0], 'i'));

    rerender(<AvatartByFirstLetter name={name2} />);

    await screen.findByRole('heading');

    expect(screen.getByRole('heading')).toHaveTextContent(new RegExp(name2[0], 'i'));
  });
});
