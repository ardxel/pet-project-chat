import { userStub } from '../test/stubs/user.stub';
export const UserService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(userStub()),
  findById: jest.fn().mockResolvedValue(userStub()),
  findByEmail: jest.fn().mockResolvedValue(userStub()),
  findByManyIds: jest.fn().mockResolvedValue([userStub()]),
  update: jest.fn().mockResolvedValue(userStub()),
  delete: jest.fn().mockResolvedValue(userStub()),
});
