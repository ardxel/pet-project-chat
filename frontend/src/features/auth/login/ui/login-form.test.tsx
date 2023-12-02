import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders, server, userStub } from 'test';
import { LoginForm } from '.';

describe('Test Login Form', () => {
  const password = 'Qwerty12345!';
  const email = userStub().email;

  beforeEach(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });

  test('input email, password', async () => {
    const onSuccess = jest.fn();
    const user = userEvent.setup();

    renderWithProviders(<LoginForm onSuccess={onSuccess} />);

    const emailLabelInputElement = await screen.findByLabelText('Почтовый адрес:');
    const passwordLabelInputElement = await screen.findByLabelText('Пароль:');

    expect(emailLabelInputElement).toBeInTheDocument();
    expect(passwordLabelInputElement).toBeInTheDocument();

    await waitFor(async () => {
      await user.type(emailLabelInputElement, email);
      await user.type(passwordLabelInputElement, password);
    });

    expect((emailLabelInputElement.closest('input[type="text"]') as HTMLInputElement).value).toBe(email);
    expect((passwordLabelInputElement.closest('input[type="password"]') as HTMLInputElement).value).toBe(password);
  });

  test('submit form', async () => {
    const onSuccess = jest.fn();
    const user = userEvent.setup();
    renderWithProviders(<LoginForm onSuccess={onSuccess} />);

    const emailLabelInputElement = await screen.findByLabelText('Почтовый адрес:');
    const passwordLabelInputElement = await screen.findByLabelText('Пароль:');

    await waitFor(async () => {
      await user.type(emailLabelInputElement, email);
      await user.type(passwordLabelInputElement, password);
    });

    await waitFor(async () => {
      await user.click(screen.getByText('Войти'));
    });

    await waitFor(() => {
      expect(onSuccess).toBeCalled();
    });
  });

  test('state should be updated', async () => {
    const onSuccess = jest.fn();
    const user = userEvent.setup();

    const { store } = renderWithProviders(<LoginForm onSuccess={onSuccess} />);

    const emailLabelInputElement = await screen.findByLabelText('Почтовый адрес:');
    const passwordLabelInputElement = await screen.findByLabelText('Пароль:');

    await waitFor(async () => {
      await user.type(emailLabelInputElement, email);
      await user.type(passwordLabelInputElement, password);
    });

    await waitFor(async () => user.click(screen.getByText('Войти')));

    const sessionState = (store.getState() as RootState).session;

    expect(sessionState.accessToken).toBeTruthy();
    expect(sessionState.isAuthorized).toBeTruthy();
    expect(sessionState.user).toHaveProperty('email', email);
  });
});
