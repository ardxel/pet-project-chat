import { messageStub } from 'modules/message/test/stubs/message.stub';
import { conversationStub } from '../test/stubs/conversationStub';

export const ConversationService = jest.fn().mockReturnValue({
  create: jest.fn().mockResolvedValue(conversationStub()),
  findById: jest.fn().mockResolvedValue(conversationStub()),
  findMessages: jest.fn().mockResolvedValue([messageStub()]),
  findAllByUserId: jest.fn().mockResolvedValue([conversationStub()]),
  update: jest.fn().mockResolvedValue(conversationStub()),
  delete: jest.fn().mockResolvedValue(true),
  isExist: jest.fn().mockResolvedValue(false),
  isNotExist: jest.fn().mockResolvedValue(true),
  findAll: jest.fn().mockResolvedValue([conversationStub()]),
  deleteAll: jest.fn().mockResolvedValue(true),
});
