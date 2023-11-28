import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ConversationService } from 'modules/conversation';
import { HashService, UserService } from 'modules/user';
import { Conversation, Message, User } from 'schemas';
import { MessageService } from '../message.service';

describe('MessageService', () => {
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        ConversationService,
        UserService,
        HashService,
        { provide: getModelToken(User.name), useValue: {} },
        { provide: getModelToken(Conversation.name), useValue: {} },
        { provide: getModelToken(Message.name), useValue: {} },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
