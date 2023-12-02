import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { B2Service } from 'modules/b2/b2.service';
import { ConversationService } from 'modules/conversation';
import { HashService, UserService } from 'modules/user';
import { ContactService } from 'modules/user/contact.service';
import { Conversation, User } from 'schemas';
import { AuthService } from '../auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        HashService,
        UserService,
        JwtService,
        ConversationService,
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
