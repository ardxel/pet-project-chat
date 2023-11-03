import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from 'shared/lib';
import { LoginForm } from '.';

describe('Test Login Form', () => {
  let errorSpy;
  beforeEach(() => {
    errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  test('submit form', async () => {
    const onSuccess = jest.fn();
    const user = userEvent.setup();

    renderWithProviders(<LoginForm onSuccess={onSuccess} />);

    const emailInput = await screen.findByLabelText('Почтовый адрес:');
    const passwordInput = await screen.findByLabelText('Пароль:');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    await user.type(emailInput, 'example123@gmail.com');
    await user.type(passwordInput, 'Qwerty12345!');

    await user.click(screen.getByRole('button', { name: 'Войти' }));

    await waitFor(() => {
      expect(onSuccess).not.toBeCalled();
    });
  });
});
