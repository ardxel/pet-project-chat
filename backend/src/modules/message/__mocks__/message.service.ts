import { messageStub } from '../test/stubs/message.stub';

export const MessageService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(messageStub()),
  findById: jest.fn().mockResolvedValue(messageStub()),
  deleteAll: jest.fn().mockResolvedValue(true),
  findAll: jest.fn().mockResolvedValue([messageStub()]),
});
