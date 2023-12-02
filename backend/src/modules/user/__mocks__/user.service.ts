import { userStub } from '../test/stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(userStub()),
  findById: jest.fn().mockResolvedValue(userStub()),
  findByEmail: jest.fn().mockResolvedValue(userStub()),
  findAll: jest.fn().mockResolvedValue([userStub()]),
  findMany: jest.fn().mockResolvedValue([userStub()]),
  update: jest.fn().mockResolvedValue(userStub()),
  changePassword: jest.fn().mockResolvedValue(userStub()),
  delete: jest.fn().mockResolvedValue(userStub()),
  deleteMany: jest.fn().mockResolvedValue([userStub()]),
  isExist: jest.fn().mockResolvedValue(true),
  isNotExist: jest.fn().mockResolvedValue(false),
});
