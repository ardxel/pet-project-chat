import { userStub } from 'modules/user/test/stubs/user.stub';

export const AuthService = jest.fn().mockReturnValue({
  signUp: jest.fn().mockResolvedValue({ user: userStub(), token: 'access_token' }),
  signIn: jest.fn().mockResolvedValue({ user: userStub(), token: 'access_token' }),
});
