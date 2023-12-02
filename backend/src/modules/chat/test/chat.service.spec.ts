import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from 'modules/auth';
import { B2Service } from 'modules/b2/b2.service';
import { ConversationService } from 'modules/conversation';
import { HashService, UserService } from 'modules/user';
import { ContactService } from 'modules/user/contact.service';
import { Conversation, User } from 'schemas';
import { ChatService } from '../chat.service';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        ConversationService,
        HashService,
        ChatService,
        UserService,
        JwtService,
        ContactService,
        B2Service,
        ConfigService,
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

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
