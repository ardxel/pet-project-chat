import { User } from 'schemas';

export const userStub = (): User => ({
  email: 'test@example.com',
  name: 'john123',
  password: 'Qwerty1234!',
});
