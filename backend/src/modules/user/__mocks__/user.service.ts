import { userStub } from '../test/stubs/user.stub';
export const UserService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(userStub()),
  readById: jest.fn().mockResolvedValue(userStub()),
  readByEmail: jest.fn().mockResolvedValue(userStub),
  readManyByIds: jest.fn().mockResolvedValue([userStub()]),
  update: jest.fn().mockResolvedValue(userStub()),
  delete: jest.fn().mockResolvedValue(userStub()),
});
