import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from 'modules/user';
import { Conversation, User } from 'schemas';
import { ConversationService } from '../conversation.service';

describe('ConversationService', () => {
  let service: ConversationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConversationService,
        UserService,
        {
          provide: getModelToken(Conversation.name),
          useValue: {},
        },
        {
          provide: getModelToken(User.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<ConversationService>(ConversationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
